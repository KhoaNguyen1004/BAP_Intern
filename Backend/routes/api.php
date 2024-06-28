<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/not-authorized', function () {
    return response()->json(['error' => 'Unauthorized. Please login.'], 401);
})->name('login');
Route::post('/LoginProcessing', [UserController::class, 'LoginProcessing']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', [UserController::class, 'Show']);
    Route::get('/GetAllTemplate', [UserController::class, 'GetAllTemplate']);
    Route::get('/GetTemplate/{template}', [UserController::class, 'GetTemplate']);
    
    Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
        Route::post('/AddTemplate', [UserController::class, 'AddTemplate']);
        Route::put('/EditTemplate/{template}', [UserController::class, 'EditTemplate']);
        Route::delete('/DeleteTemplate/{template}', [UserController::class, 'DeleteTemplate']);
        Route::put('/{template}', [UserController::class, 'ChangeTemplate']);
    });
});
