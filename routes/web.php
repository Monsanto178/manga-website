<?php

use App\Http\Controllers\MangaController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    sleep(0);
    return inertia('Home');
});

Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::get('/mangas/{type}', [MangaController::class, 'getMangas']);

Route::get('/mangas/manga/{mangaId}', [MangaController::class, 'getManga']);
Route::post('/mangas/manga/getManga', [MangaController::class, 'getMangaById']);
Route::post('/mangas/manga/related', [MangaController::class, 'getRelated']);
Route::get('/mangas/manga/{mangaId}/characters', [MangaController::class, 'getCharacters']);
Route::post('/mangas/manga/getAuthors', [MangaController::class, 'getAuthor']);
Route::post('/mangas/manga/getRecommendations', [MangaController::class, 'getRecommendations']);
Route::post('/mangas/manga/reviews', [MangaController::class, 'getMangaReviews']);

Route::get('/tags', [MangaController::class, 'getTagSelection']);
Route::post('/tags/getAllTags', [MangaController::class, 'getAllTags']);
Route::get('/tags/{tag}',[MangaController::class, 'getTag']);
Route::post('/tags/getMangas', [MangaController::class, 'getMangaByTag']);

Route::get('/reviews', [MangaController::class, 'getReviews']);
Route::post('/reviews', [MangaController::class, 'getRecentReviews']);

Route::get('/author/{author}', [MangaController::class, 'getAuthorPage']);
Route::post('/author/getFullAuthor', [MangaController::class, 'getFullAuthor']);

Route::post('/mangas/search', [MangaController::class, 'search']);

Route::get('/mangas/search/{parameters}', [MangaController::class, 'getTopMangas']);