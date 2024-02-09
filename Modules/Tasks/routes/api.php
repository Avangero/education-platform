<?php

use Illuminate\Support\Facades\Route;
use Modules\Tasks\App\Http\Controllers\Student\AnswerController;
use Modules\Tasks\App\Http\Controllers\Student\CommentController;
use Modules\Tasks\App\Http\Controllers\Student\StatusController;
use Modules\Tasks\App\Http\Controllers\Student\TaskController;

Route::middleware('auth:sanctum')->prefix('student')->group(function () {
    Route::prefix('courses/tasks')->group(function () {
        Route::get('', [TaskController::class, 'index']);

        Route::prefix('{id}')->group(function () {
            Route::post('comment', [CommentController::class, 'store']);

            Route::post('answer', [AnswerController::class, 'store']);
            Route::delete('answer', [AnswerController::class, 'destroy']);

            Route::post('status', [StatusController::class, 'update']);
        })->middleware('check.task.access');
    });
});
