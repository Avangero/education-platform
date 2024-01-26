<?php

use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return view('app');
})->name('login');

Route::middleware(['auth:api'])->get('/{any}', function () {
    return view('app');
})->where('any', '.*');
