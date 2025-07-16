<?php

use App\Http\Controllers\MangaController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    sleep(0);
    return inertia('Home');
});
Route::get('/otro', function () {
    sleep(0);
    return inertia('MangaPage');
});

Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::get('/mangas/tops/{page}', [MangaController::class, 'getTopMangas']);
Route::get('/mangas/populars/{page}', [MangaController::class, 'getPopularMangas']);
Route::get('/mangas/recents/{page}', [MangaController::class, 'getRecentMangas']);
Route::get('/mangas/recommendations/{page}', [MangaController::class, 'getRecommendations']);
Route::get('/mangas/manga/{mangaId}', [MangaController::class, 'getManga']);
Route::get('/mangas/manga/related/{type}/{mal_id}', [MangaController::class, 'getRelated']);
Route::get('/mangas/manga/{mangaId}/characters', [MangaController::class, 'getCharacters']);
Route::post('/mangas/manga/getAuthors', [MangaController::class, 'getAuthor']);


Route::get('/mangas/search/{parameters}', [MangaController::class, 'getTopMangas']);