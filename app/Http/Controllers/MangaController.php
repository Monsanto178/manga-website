<?php

namespace App\Http\Controllers;

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

    public function getRelated($type, $mal_id) {
        $acceptedTypes = ['manga', 'anime'];

        if(!in_array($type, $acceptedTypes, true)) {
            return response()->json([
                'error' => 'Invalid input.'
            ], 400);
        };
        $endpoint = match ($type) {
            'manga' => "https://api.jikan.moe/v4/manga/$mal_id",
            'anime' => "https://api.jikan.moe/v4/anime/$mal_id",
            'default' => null
        };

        try {
            $response = Http::retry(3, 1000)->get($endpoint);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'error' => 'Failed to fetch Data',
                'status' => $response->status()
            ], $response->status());
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Connection Error.',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function getAuthor(Request $request) {
        $authors_id = $request->input('authors_ids');
        $manga_id = $request->input('manga_id');

        Log::info(['array' => $authors_id]);


        if (!is_array($authors_id)) {
            return response()->json(['error' => 'Invalid input.'], 400);
        }

        $results = [];

        foreach ($authors_id as $author_id) {
            // Log::info(['author_id: ' => $author_id]);
            $author_res = Http::retry(3, 1000)->get("https://api.jikan.moe/v4/people/$author_id");

            if (!$author_res->successful()) {
                continue;
            }

            $author_data = $author_res->json('data');
            // Log::info(['Author devuelto: ' => $author_data]);

            $author_mangas = Http::timeout(60)->retry(3, 1000)->get("https://api.jikan.moe/v4/people/$author_id/manga");

            $position = null;

            if ($author_mangas->successful()) {
                $mangaList = $author_mangas->json('data');
                foreach ($mangaList as $entry) {
                    if ($entry['manga']['mal_id'] === $manga_id) {
                        $position = $entry['position'];
                        break;
                    }
                }
            }

            $results[] = [
                'mal_id' => $author_id,
                'name' => $author_data['name'] ?? null,
                'image_url' => $author_data['images']['jpg']['image_url'],
                'position' => $position
            ];
        }
        Log::info(['ARRAY DEFINITIVO: ' => $results]);
        return response()->json($results, 200);
    }


    function getCharacters($mangaId) {
        $response = Http::retry(3, 100)->get("https://api.jikan.moe/v4/manga/$mangaId/characters");

        if (!$response->successful()) {
            return response()->json('The solicitude has failed.', 400);
        }

        return response()->json($response, 200);
    }
}
