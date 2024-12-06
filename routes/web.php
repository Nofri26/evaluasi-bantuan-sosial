<?php

use App\Http\Controllers\Master\MAssistanceDistributionReports\MAssistanceDistributionReportInertiaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/m-asisstance-distribution-reports', [MAssistanceDistributionReportInertiaController::class, 'index'])->name('m-asisstance-distribution-reports.index');
    Route::get('/m-asisstance-distribution-reports/create', [MAssistanceDistributionReportInertiaController::class, 'create'])->name('m-asisstance-distribution-reports.create');
    Route::get('/m-asisstance-distribution-reports/show', [MAssistanceDistributionReportInertiaController::class, 'show'])->name('m-asisstance-distribution-reports.show');
    Route::get('/m-asisstance-distribution-reports/edit', [MAssistanceDistributionReportInertiaController::class, 'edit'])->name('m-asisstance-distribution-reports.edit');
});

require __DIR__ . '/auth.php';
