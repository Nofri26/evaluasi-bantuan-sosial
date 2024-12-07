<?php

use App\Http\Controllers\Master\MAssistanceDistributionReports\MAssistanceDistributionReportApiController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('assistance-distribution-reports', MAssistanceDistributionReportApiController::class);
Route::put('assistance-distribution-reports/verification/{id}', [MAssistanceDistributionReportApiController::class, 'verification']);
Route::put('assistance-distribution-reports/reject/{id}', [MAssistanceDistributionReportApiController::class, 'reject']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
