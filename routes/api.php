<?php

use App\Http\Controllers\Master\MAssistanceDistributionReportController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('assistance-distribusion-reports', MAssistanceDistributionReportController::class);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
