<?php

use App\Http\Controllers\Master\MAssistanceDistributionReports\MAssistanceDistributionReportInertiaController;
use App\Http\Controllers\ProfileController;
use App\Models\Master\MAssistanceDistributionReport;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\DB;
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
    $total_reports = MAssistanceDistributionReport::query()->count();

    $recipients_per_program = MAssistanceDistributionReport::query()
        ->select('program_id', DB::raw('SUM(recipients_count) as total_recipients'))
        ->groupBy('program_id')
        ->with('program') // Pastikan ada relasi 'program'
        ->get()
        ->map(function ($item) {
            return [
                'program_id' => $item->program_id,
                'program' => $item->program, // Mengirim seluruh data program
                'total_recipients' => $item->total_recipients,
            ];
        });

    $distribution_per_region = MAssistanceDistributionReport::query()
        ->select('region_id', DB::raw('SUM(recipients_count) as total_recipients'))
        ->groupBy('region_id')
        ->with('region') // Pastikan ada relasi 'region'
        ->get()
        ->map(function ($item) {
            return [
                'region_id' => $item->region_id,
                'region' => $item->region, // Mengirim seluruh data region
                'total_recipients' => $item->total_recipients,
            ];
        });

    return Inertia::render('Dashboard', [
        'total_reports' => $total_reports,
        'recipients_per_program' => $recipients_per_program,
        'distribution_per_region' => $distribution_per_region,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/m-asisstance-distribution-reports', [MAssistanceDistributionReportInertiaController::class, 'index'])->name('m-asisstance-distribution-reports.index');
    Route::get('/m-asisstance-distribution-reports/verification', [MAssistanceDistributionReportInertiaController::class, 'verification'])->name('m-asisstance-distribution-reports.verification');
    Route::get('/m-asisstance-distribution-reports/create', [MAssistanceDistributionReportInertiaController::class, 'create'])->name('m-asisstance-distribution-reports.create');
    Route::get('/m-asisstance-distribution-reports/show', [MAssistanceDistributionReportInertiaController::class, 'show'])->name('m-asisstance-distribution-reports.show');
    Route::get('/m-asisstance-distribution-reports/edit', [MAssistanceDistributionReportInertiaController::class, 'edit'])->name('m-asisstance-distribution-reports.edit');
});

require __DIR__ . '/auth.php';
