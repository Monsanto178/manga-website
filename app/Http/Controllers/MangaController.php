<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Pool;
use Illuminate\Http\Client\Response as ClientResponse;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MangaController extends Controller
{
    public function getMangas(string $type) {
        $nsfwIds = [12,49,35];
        $genresIds = collect(range(1, 83))
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
            $params['genres'] = $genresIds;
        }

        $response = Http::timeout(60)->retry(3, 1000)->get($endpoint, $params);

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
            return response()->json($data, 200);
        }

    }

    public function getManga($mangaId) {
        // $response = Http::timeout(60)->get("https://api.jikan.moe/v4/manga/$mangaId/full");
        // $manga = $response->json();
        // return inertia('MangaPage', ['manga' => $manga['data']]);
        if ($mangaId === 'random') {
            return inertia('MangaPage', ['mangaId' => 'random']);
        }
        return inertia('MangaPage', ['mangaId' => $mangaId]);
    }

    public function getMangaById(Request $request) {
        $mangaId = $request->input('mangaId', null);
        if ($mangaId === 'random') {
            $response = Http::timeout(60)->get("https://api.jikan.moe/v4/random/manga");
            $res = $response->json('data');
            $mangaId = $res['mal_id'];
        }
        $response = Http::timeout(60)->get("https://api.jikan.moe/v4/manga/$mangaId/full");
        $res = $response->json();

        return response()->json($res, 200);
    }

    public function getRelated(Request $request) {
        $data = $request->input('data');
        $results = [];

        $endpoints = array_map(function ($media){
            return [
            'url' => match ($media['type']) {
                'manga' => "https://api.jikan.moe/v4/manga/$media[mal_id]",
                'anime' => "https://api.jikan.moe/v4/anime/$media[mal_id]",
                'default' => null
            },
            'relation' => $media['relation']
        ];
        }, $data);

        $chunks = array_chunk($endpoints, 3);

        foreach ($chunks as $idx => $chunck) {
            $responses = Http::pool(fn ($pool) =>
                array_map(fn ($item) => $pool->timeout(60)->retry(3, 1000)->get($item['url']), $chunck)
            );

            foreach ($chunck as $i => $item) {
                $response = $responses[$i];

                if ($response instanceof ClientResponse && $response->successful()) {
                    $results[] = [
                        'entry' => $response->json('data'),
                        'relation' => $item['relation']
                    ];
                }
            }
        }
        

        Log::info(['Longitud del resultado:' => count($results)]);
        return response()->json($results, 200);
    }


    public function getAuthor(Request $request) {
        $authors_id = $request->input('authors_ids');
        $manga_id = $request->input('manga_id');

        if (!is_array($authors_id)) {
            return response()->json(['error' => 'Invalid input.'], 400);
        }

        $results = [];

        $authors_res = Http::pool(fn (Pool $pool) =>  
            array_map(fn ($id) => $pool->retry(3, 1000)->get("https://api.jikan.moe/v4/people/$id"), $authors_id)
        );

        $mangas_res = Http::pool(fn (Pool $pool) =>  
            array_map(fn ($id) => $pool->retry(3, 1000)->get("https://api.jikan.moe/v4/people/$id/manga"), $authors_id)
        );

        foreach ($authors_id as $idx => $response) {
            if ($mangas_res[$idx]->successful() && $authors_res[$idx]->successful()) {
                $mangas = $mangas_res[$idx]->json('data');
                $author = $authors_res[$idx]->json('data');

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
            }
        };
        // Log::info(['results' => $results]);

        return response()->json($results, 200);
    }

    public function getRecommendations(Request $request) {
            $mangaId = $request->input('mangaId', null);
            $response = Http::timeout(60)->retry(3, 1000)->get("https://api.jikan.moe/v4/manga/$mangaId/recommendations");
            $res = $response->json('data');

            $data = array_map(function($recommend) {return $recommend['entry'];}, $res);

            return response()->json($data, 200);
    }


    function getCharacters($mangaId) {
        $response = Http::retry(3, 1000)->get("https://api.jikan.moe/v4/manga/$mangaId/characters");

        if (!$response->successful()) {
            return response()->json('The solicitude has failed.', 400);
        }

        return response()->json($response->json(), 200);
    }

    function getMangaReviews(Request $request) {
        $mangaId = $request->input('mangaId', null);
        $page = $request->input('page', 1);
        if ($mangaId) {
            $response = Http::timeout(60)->retry(3, 1000)->get("https://api.jikan.moe/v4/manga/$mangaId/reviews", 
            ['page' => $page]);
            $res = $response->json();

            return response()->json($res, 200);
        }
    }

    function getAuthorPage($author) {
        return inertia('AuthorPage', ['mal_id' => $author]);
    }
    
    function getFullAuthor(Request $request) {
        $authorId = $request->input('authorId', null);
        Log::info(['AUTHOR ID' => $authorId]);
        if ($authorId) {
            $response = Http::timeout(60)->retry(3, 1000)->get("https://api.jikan.moe/v4/people/$authorId/full");
            $res = $response->json('data');
            // Log::info(['AUTHOR' => $res]);
            return response()->json($res, 200);
        }
    }



    function getTagSelection() {
        return inertia('CategorySelection');
    }

    function getAllTags() {
        $response = Http::timeout(60)->get('https://api.jikan.moe/v4/genres/manga');
        $res = $response->json('data');
        $data = collect($res)->unique('mal_id')->values()->all();


        return response()->json($data, 200);
    }

    function getTag($tag) {
        if ($tag === 'top') {
            return inertia('TopMangaPage', [
                'name' => 'Tops Works', 
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

        $response = Http::timeout(90)->retry(3, 1000)->get("https://api.jikan.moe/v4/genres/manga");
        $genres = $response->json('data');
        $genreId = 0;
        $genreName = "";
        $page = request()->query('page', '1');
        $status = request('status', null);
        $type = request('type', null);
        $order_by = request('order_by', 'score');

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
    }

    function getMangaByTag(Request $request) {
        $tag = $request->input('genreId') ?? null;
        $page = $request->input('page') ?? 1;
        $type = $request->input('type') ?? null;
        $status = $request->input('status') ?? null;
        $order_by = $request->input('order_by') ?? null;
        $sort = $request->input('sort' ?? null);
        $query = $request->input('query' ?? null); 

        $params = [
            // 'genres' => $tag,
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

            $response = Http::timeout(60)->retry(3, 1000)
            ->get($endpoint, $params);

            $data = $response->json();

            return response()->json($data, 200);
        }
        

        if ($tag)      {$params['genres'] = $tag;}
        if ($sort)     {$params['sort'] = $sort;}
        if ($order_by) {$params['order_by'] = $order_by;}
        if ($type)     {$params['type'] = $type;}
        if ($status)   {$params['status'] = $status;}
        if($query)     {$params['q'] = $query;}

        $endpoint = "https://api.jikan.moe/v4/manga";

        $response = Http::timeout(60)->retry(3, 1000)
        ->get($endpoint, $params);

        $data = $response->json();

        return response()->json($data, 200);
    }

    function getReviews() {
        return inertia('RecentsReviews');
    }

    function getRecentReviews() {
        $response = Http::timeout(60)->retry(3, 1000)->get('https://api.jikan.moe/v4/reviews/manga');
        $res = $response->json('data');

        return response()->json($res, 200);
    }

    function search(Request $request) {
        $name = $request->input('name', '');

        $response = Http::timeout(120)->retry(3, 1000)->get("https://api.jikan.moe/v4/manga?q=$name");
        $res = $response->json();

        return response()->json($res, 200);
    }
}
