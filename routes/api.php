<?php

use App\Http\Controllers\Master\MAssistanceDistributionReports\MAssistanceDistributionReportApiController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('assistance-distribution-reports', MAssistanceDistributionReportApiController::class);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
