<?php

use App\Http\Controllers\Api\V1\Admin\AdminUserController;
use App\Http\Controllers\Api\V1\TicketCategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\Customer\TicketController as CustomerTicketController;
use App\Http\Controllers\Api\V1\Admin\TicketController as AdminTicketController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider within a group
| which is assigned the "api" middleware group.
|
*/

// Auth Routes (no role needed)
Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'me']);
    });
});

// Protected API v1 Routes
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    // Customer Routes
    Route::prefix('customer')->middleware('role:customer')->group(function () {
        Route::get('tickets', [CustomerTicketController::class, 'index']);
        Route::post('tickets', [CustomerTicketController::class, 'store']);
        Route::get('tickets/{ticket}', [CustomerTicketController::class, 'show']);
        Route::post('tickets/{ticket}/reply', [CustomerTicketController::class, 'reply']);
        Route::get('ticket-categories', [TicketCategoryController::class, 'index']);
    });

    // Admin Routes
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('tickets', [AdminTicketController::class, 'index']);
        Route::get('tickets/{ticket}', [AdminTicketController::class, 'show']);
        Route::post('tickets/{ticket}/open', [AdminTicketController::class, 'open']);
        Route::post('tickets/{ticket}/closed', [AdminTicketController::class, 'closed']);
        Route::post('tickets/{ticket}/pending', [AdminTicketController::class, 'pending']);
        Route::post('tickets/{ticket}/reply', [AdminTicketController::class, 'reply']);
        Route::delete('tickets/{ticket}', [AdminTicketController::class, 'destroy']);
        Route::get('users', [AdminUserController::class, 'index']);
    });

});
