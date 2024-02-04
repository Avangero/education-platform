<?php

use App\Http\Controllers\Student\AnswerController;
use App\Http\Controllers\Student\CommentController;
use App\Http\Controllers\Student\StatusController;
use App\Http\Controllers\Student\TaskController;

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [UserController::class, 'get']);
});

Route::middleware('auth:sanctum')->prefix('student')->group(function () {
    Route::prefix('courses/tasks')->group(function () {
        Route::get('', [TaskController::class, 'index']);

        Route::prefix('{id}')->group(function () {
            Route::middleware('check.task.access')->group(function () {
                Route::post('comment', [CommentController::class, 'store']);

                Route::post('answer', [AnswerController::class, 'store']);
                Route::delete('answer', [AnswerController::class, 'destroy']);

                Route::post('status', [StatusController::class, 'update']);
            });
        });
    });
});
