<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;

Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::post('/contacts', [ContactController::class, 'create']);

    // Route::get('/contacts', [ContactController::class, 'findBy'])->middleware('owner.contact');
    Route::get('/contacts/{id}', [ContactController::class, 'findById'])->middleware('owner.contact');
    Route::put('/contacts/{id}', [ContactController::class, 'update'])->middleware('owner.contact');
    Route::delete('/contacts/{id}', [ContactController::class, 'delete'])->middleware('owner.contact');

    Route::get('/logout', [AuthenticationController::class, 'logout']);
    Route::get('/me', [AuthenticationController::class, 'me']);
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'findById']);

Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);