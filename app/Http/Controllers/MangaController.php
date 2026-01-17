<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Client\Pool;
use Illuminate\Http\Client\Response as ClientResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MangaController extends Controller
{
    public function getMangas(string $type) {
        $acceptedTypes = ['top', 'recent', 'popular', 'recommendation'];
        if(!in_array($type, $acceptedTypes)) return response(['Error' => 'Invalid type'], 422);

        $nsfwIds = [12,49,35];
        $genresId = collect(range(1, 83))
        ->reject(fn($id) => in_array($id, $nsfwIds))
        ->shuffle()->first();

        $endpoint = 'https://api.jikan.moe/v4/manga';
        $params = [
            'sort' => 'desc',
            'limit' => 10,
            'page' => 1,
        ];

        if($type === 'top') {$endpoint = 'https://api.jikan.moe/v4/top/manga';}
        if($type === 'recent') {$params['order_by'] = 'start_date';}
        if($type === 'popular') {
            $params['order_by'] = 'popularity';
            $params['sort'] = 'asc';
            $params['min_score'] = '1';
        }
        if($type === 'recommendation') {
            $params['order_by'] = 'score';
            $params['genres'] = $genresId;
        }

        try {
            $response = Http::timeout(60)->retry(3, 1000)->get($endpoint, $params);

            if(!$response->successful()){
                throw new Exception("Unexpected API Response", 1);                
            };

            $data = $response->json();

            if ($type === 'recent') {
                $uniqueMangas = collect($data['data'] ?? [])
                ->unique('mal_id')
                ->values()
                ->all();

                return response()->json([
                    ...$data,
                    'data' => $uniqueMangas,
                ]);
            } else {
                return response()->json($data);
            }
            
        } catch (\Throwable $th) {
            Log::error('Error Trying to Get Mangas.', ['type' => $type, 'message' => $th->getMessage()]);

            return response(['Error' => 'Error Processing Request'],500);
        }
    }

    public function getManga($mangaId) {
        if ($mangaId === 'random') {
            return inertia('MangaPage', ['mangaId' => 'random']);
        }
        return inertia('MangaPage', ['mangaId' => $mangaId]);
    }

    public function getMangaById(Request $request) {
        $mangaId = $request->input('mangaId', null);

        $endpoint = $mangaId === 'random' ? "https://api.jikan.moe/v4/random/manga": "https://api.jikan.moe/v4/manga/$mangaId/full";

        try {
            $response = Http::timeout(60)->retry(3, 1000)->get($endpoint);
            if(!$response->successful()) throw new Exception("Unexpected API Response", 1);

            $res = $response->json('data');
            
            return response()->json($res);
        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Manga Data.', ['message' => $th->getMessage()]);
            return response(['Error' => 'Error Processing Request'], 500);
        }
    }

    public function getRelated(Request $request) {
        $data = $request->input('data');
        $results = [];
        if(!is_array($data)) return response(['Error' => 'Invalid Input'], 500);

        try {
            $endpoints = [];
            foreach ($data as $media) {
                $malId = $media['mal_id'];
                $type = $media['type'];
                $relation = $media['relation'];

                $cacheKey = "_{$type}_{$malId}";
                $cached = Cache::get($cacheKey);

                if(!$cached) {
                    $url = match($type) {
                        'manga' => "https://api.jikan.moe/v4/manga/$malId",
                        'anime' => "https://api.jikan.moe/v4/anime/$malId",
                        default => null
                    };

                    if(!$url) {
                        continue;
                    }

                    $endpoints[] = [
                        'url' => $url,
                        'relation' => $relation,
                        'cacheKey' => $cacheKey
                    ];

                } else {
                    $results[] = [
                        'entry' => $cached,
                        'relation' => $relation
                    ];
                }
            }

            $chunks = array_chunk($endpoints, 3);

            foreach ($chunks as $chunk) {
                $responses = Http::pool(fn ($pool) => 
                    array_map(fn ($item) => $pool->timeout(60)->retry(3, 1000)->get($item['url']), $chunk)
                );
                
                foreach ($chunk as $i => $item) {
                    $response = $responses[$i];

                    if (!$response instanceof ClientResponse || !$response->successful()) {
                        throw new Exception("Error Processing Request", 1);
                    }

                    $data = $response->json('data');

                    Cache::put($item['cacheKey'], $data, now()->addHour());

                    $results[] = [
                        'entry' => $data,
                        'relation' => $item['relation']
                    ];
                }

                // usleep(500000);
            }

            return response()->json($results);

        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Manga Data.', ['message' => $th->getMessage()]);
            return response(['Error' => 'Error Processing Request'], 500);
        }
    }

    public function getAuthor(Request $request) {
        $authors_id = $request->input('authors_ids');
        $manga_id = $request->input('manga_id');

        if (!is_array($authors_id)) {
            return response(['Error' => 'Invalid input.'], 500);
        }

        $results = [];

        try {
            $authors_res = Http::pool(fn (Pool $pool) =>  
                array_map(fn ($id) => $pool->retry(3, 1000)->get("https://api.jikan.moe/v4/people/$id/full"), $authors_id)
            );

            foreach ($authors_id as $idx => $response) {
                if(!$authors_res[$idx]->successful()) throw new Exception("Error Processing Request", 1);
                
                $author = $authors_res[$idx]->json('data');
                $mangas = $author['manga'];

                $position = null;
                foreach ($mangas as $manga) {
                    if ($manga['manga']['mal_id'] === $manga_id) {
                        $position = $manga['position'];
                    }
                }

                $results[] = [
                    'mal_id' => $author['mal_id'],
                    'name' => $author['name'] ?? null,
                    'image_url' => $author['images']['jpg']['image_url'],
                    'position' => $position
                ];
            };
            return response()->json($results);

        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Author', ['Message' => $th->getMessage()]);
            return response(['Error' => 'Error Processing Request'], 500);
        }
    }

    public function getRecommendations(Request $request) {
            $mangaId = $request->input('mangaId', null);

            try {
                $response = Http::timeout(60)->retry(3, 1000)->get("https://api.jikan.moe/v4/manga/$mangaId/recommendations");

                if(!$response->successful()) throw new Exception("Error Processing Request", 1);
                
                $res = $response->json('data');

                $data = array_map(function($recommend) {return $recommend['entry'];}, $res);

                return response()->json($data, 200);

            } catch (\Throwable $th) {
                Log::error('Error Trying to Fetch Recommendations', ['Message' => $th->getMessage()]);
                return response(['Error' => 'Error Processing Request'], 500);
            }
    }

    function getCharacters($mangaId) {
        try {
            $response = Http::timeout(60)->retry(3, 1000)->get("https://api.jikan.moe/v4/manga/$mangaId/characters");

            if (!$response->successful()) {
                throw new Exception("Error Processing Request", 1);
            }

            return response()->json($response->json());
        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Characters', ['Message' => $th->getMessage()]);
            return response(['Error' => 'Error Processing Request'], 500);
        }
    }

    function getMangaReviews(Request $request) {
        $mangaId = $request->input('mangaId', null);
        $page = $request->input('page', 1);

        try {
            $response = Http::timeout(60)->retry(3, 1000)->get("https://api.jikan.moe/v4/manga/$mangaId/reviews", 
            ['page' => $page]);

            if(!$response->successful()) throw new Exception("Error Processing Request", 1);
            
            $res = $response->json();

            return response()->json($res);
        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Manga Reviews', ['Message' => $th->getMessage()]);
            return response(['Error' => 'Error Processing Request'], 500);
        }
    }

    function getAuthorPage($author) {
        return inertia('AuthorPage', ['mal_id' => $author]);
    }
    
    function getFullAuthor(Request $request) {
        $authorId = $request->input('authorId', null);

        try {
            $response = Http::timeout(60)->retry(3, 1000)->get("https://api.jikan.moe/v4/people/$authorId/full");

            if(!$response->successful()) throw new Exception("Error Processing Request", 1);
            
            $res = $response->json('data');

            return response()->json($res);
        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Full Author', ['Message' => $th->getMessage()]);
            return response(['Error' => 'Error Processing Request'], 500);
        }
    }

    function getTagSelection() {
        return inertia('CategorySelection');
    }

    function getAllTags() {
        try {
            $response = Http::timeout(60)->get('https://api.jikan.moe/v4/genres/manga');

            if(!$response->successful()) throw new Exception("Error Processing Request", 1);

            $res = $response->json('data');
            $data = collect($res)->unique('mal_id')->values()->all();

            return response()->json($data);
        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Tags', ['Message' => $th->getMessage()]);
            return response(['Error' => 'Error Processing Request'], 500);
        }
    }

    function getTag($tag) {
        if ($tag === 'top') {
            return inertia('TopMangaPage', [
                'name' => 'Top Works', 
                'mal_id' => null,
                'page' => request('page', '1'),
            ]);
        }
        if ($tag === 'all') {
            $page = request()->query('page', '1');
            $status = request('status', null);
            $type = request('type', null);
            $query = request('q', null);
            $order_by = $query ? null : request('order_by', 'score');

            return inertia('CategoryMangaPage', [
                'name' => 'All', 
                'mal_id' => null, 
                'page' => $page,
                'order_by' => $order_by,
                'type' => $type,
                'status' => $status,
                'query' => $query
            ]);
        }

        $genreId = 0;
        $genreName = "";
        $page = request()->query('page', '1');
        $status = request('status', null);
        $type = request('type', null);
        $order_by = request('order_by', 'score');

        try {
            $response = Http::timeout(90)->retry(3, 1000)->get("https://api.jikan.moe/v4/genres/manga");

            if(!$response->successful()) throw new Exception("Error Processing Request", 1);

            $genres = $response->json('data');
            foreach ($genres as $genre) {
                $cleanName = str_replace(' ', '-', strtolower($genre['name']));
                if ($tag === $cleanName) {
                    $genreId = $genre['mal_id'];
                    $genreName = $genre['name'];
                }
            }

            return inertia('CategoryMangaPage', [
                'name' => $genreName, 
                'mal_id' => $genreId, 
                'page' => $page,
                'order_by' => $order_by,
                'type' => $type,
                'status' => $status
            ]);
        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Category', ['Message' => $th->getMessage()]);
            return inertia('CategoryMangaPage', [
                'name' => $genreName, 
                'mal_id' => $genreId, 
                'page' => $page,
                'order_by' => null,
                'type' => $type,
                'status' => $status
            ]);
        }
    }

    function getMangaByTag(Request $request) {
        $tag = $request->input('genreId') ?? null;
        $page = $request->input('page') ?? 1;
        $type = $request->input('type') ?? null;
        $status = $request->input('status') ?? null;
        $order_by = $request->input('order_by') ?? null;
        $sort = $request->input('sort' ?? null);
        $query = $request->input('query' ?? null); 
        $endpoint = "https://api.jikan.moe/v4/manga";

        $params = [
            'limit' => 10,
            'page' => $page,
        ];

        if ($order_by === 'popularity' | $order_by === 'title') {
            $sort = 'asc';
            if ($order_by === 'popularity') {
                $params['min_score'] = '1';
            }
        }

        if ($request->input('isTop')) {
            $endpoint = "https://api.jikan.moe/v4/top/manga";
        }
        

        if ($tag)      {$params['genres'] = $tag;}
        if ($sort)     {$params['sort'] = $sort;}
        if ($order_by) {$params['order_by'] = $order_by;}
        if ($type)     {$params['type'] = $type;}
        if ($status)   {$params['status'] = $status;}
        if($query)     {$params['q'] = $query;}

        try {
            $response = Http::timeout(60)->retry(3, 1000)
            ->get($endpoint, $params);

            if(!$response->successful()) throw new Exception("Error Processing Request", 1);

            $data = $response->json();

        return response()->json($data);
        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Mangas', ['Message' => $th->getMessage()]);
            return response(['Error' => 'Error Processing Request'], 500);
        }
    }

    function getReviews() {
        return inertia('RecentsReviews');
    }

    function getRecentReviews() {
        try {
            $response = Http::timeout(60)->retry(3, 1000)->get('https://api.jikan.moe/v4/reviews/manga');
            $res = $response->json('data');

            return response()->json($res);

        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Recent Review', ['Message' => $th->getMessage()]);
            return response(['Error' => 'Error Processing Request'], 500);
        }
    }

    function search(Request $request) {
        $name = $request->input('name', '');

        try {
            $response = Http::timeout(120)->retry(3, 1000)->get("https://api.jikan.moe/v4/manga?q=$name");
            $res = $response->json();

            return response()->json($res);
            
        } catch (\Throwable $th) {
            Log::error('Error Trying to Fetch Search Results', ['Message' => $th->getMessage()]);
            return response(['Error' => 'Error Processing Request'], 500);
        }
    }
}
