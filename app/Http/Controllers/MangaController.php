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
    public function fetchManga() {
        $response = Http::timeout(60)->retry(3, 1000)->get('https://api.mangadex.dev/manga', [
            'limit' => 10,
            'order' => ['createdAt' => 'asc'],
            'includes' => ['cover_art'],
            'offset' => 0,
        ]);
        return response()->json($response->json());
    }

    public function getPopularMangas(int $page) {
        $response = Http::timeout(60)->retry(3, 1000)->get('https://api.jikan.moe/v4/manga', [
            'order_by' => 'popularity',
            'sort' => 'asc',
            'limit' => 10,
            'page' => $page,
        ]);

        return response()->json($response->json());
    }

    public function getRecentMangas(int $page) {
        $response = Http::timeout(60)->retry(3, 1000)->get('https://api.jikan.moe/v4/manga', [
            'order_by' => 'start_date',
            'sort' => 'desc',
            'limit' => 10,
            'page' => $page,
        ]);

        $data = $response->json();

        $uniqueMangas = collect($data['data'] ?? [])
        ->unique('mal_id')
        ->values()
        ->all();

        return response()->json([
            ...$data,
            'data' => $uniqueMangas,
        ]);
    }

    public function getTopMangas(int $page) {
        $response = Http::timeout(60)->retry(3, 1000)->get('https://api.jikan.moe/v4/top/manga', [
            'limit' => 10,
            'offset' => 0,
            'page' => $page,
        ]);

        return response()->json($response->json());
    }

    
    public function getRecommendations(int $page) {
        $nsfwIds = [12,49,35];
        $genresIds = collect(range(1, 83))
        ->reject(fn($id) => in_array($id, $nsfwIds))
        ->shuffle()->first();

        Log::info($genresIds);

        $response = Http::timeout(60)->retry(3, 1000)->get('https://api.jikan.moe/v4/manga', [
            'genres' => $genresIds,
            'order_by' => 'score',
            'sort' => 'desc',
            'limit' => 10,
            'page' => $page,
        ]);

        return response()->json($response->json());
    }

    public function getManga($mangaId) {
        $response = Http::timeout(60)->get("https://api.jikan.moe/v4/manga/$mangaId/full");
        $manga = $response->json();
        return inertia('MangaPage', ['manga' => $manga['data']]);
    }

    public function getRelated(Request $request) {
        $data = $request->input('data');
        $results = [];

        $endpoints = array_map(function ($media){
            return match ($media['type']) {
                'manga' => "https://api.jikan.moe/v4/manga/$media[mal_id]",
                'anime' => "https://api.jikan.moe/v4/anime/$media[mal_id]",
                'default' => null
            };
        }, $data);

        $responses = Http::pool(fn ($pool) =>
            array_map(fn ($url) => $pool->retry(3, 1000)->get($url), $endpoints)
        );
        foreach ($data as $idx => $media) {
            $response = $responses[$idx];

            if ($response instanceof ClientResponse && $response->successful()) {
                $results[] = [
                    'entry' => $response->json('data'),
                    'relation' => $media['relation']
                ];
            }
        }

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
        return response()->json($results, 200);
    }


    function getCharacters($mangaId) {
        $response = Http::retry(3, 100)->get("https://api.jikan.moe/v4/manga/$mangaId/characters");

        if (!$response->successful()) {
            return response()->json('The solicitude has failed.', 400);
        }

        return response()->json($response->json(), 200);
    }
}
