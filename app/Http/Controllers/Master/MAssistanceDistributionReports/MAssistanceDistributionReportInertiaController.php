<?php

namespace App\Http\Controllers\Master\MAssistanceDistributionReports;

use App\Http\Controllers\Controller;
use App\Models\Master\MAssistanceDistributionReport;
use Inertia\Inertia;
use Inertia\Response;

class MAssistanceDistributionReportInertiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $assistanceDistributionReports = MAssistanceDistributionReport::with(['program', 'region'])->paginate(10);

        return Inertia::render('Master/MAssistanceDistributionReports/Index', [
            'assistanceDistributionReports' => $assistanceDistributionReports
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }
}
