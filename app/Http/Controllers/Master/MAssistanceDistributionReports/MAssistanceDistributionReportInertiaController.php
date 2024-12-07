<?php

namespace App\Http\Controllers\Master\MAssistanceDistributionReports;

use App\Http\Controllers\Controller;
use App\Models\Master\MProgram;
use App\Models\Master\MRegion;
use Inertia\Inertia;
use Inertia\Response;

class MAssistanceDistributionReportInertiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $programs = MProgram::select('id', 'name')->get()->toArray();
        $regions = [
            'provinsi' => MRegion::query()->select('id', 'name', 'parent_id')->where('type', 'provinsi')->get()->toArray(),
            'kabupaten' => MRegion::query()->select('id', 'name', 'parent_id')->where('type', 'kabupaten')->get()->toArray(),
            'kecamatan' => MRegion::query()->select('id', 'name', 'parent_id')->where('type', 'kecamatan')->get()->toArray(),
        ];
        return Inertia::render('Master/MAssistanceDistributionReports/Index', [
            'programs' => $programs,
            'regions' => $regions,
            'user' => auth()->user()
        ]);
    }

    public function verification()
    {
        $programs = MProgram::select('id', 'name')->get()->toArray();
        $regions = [
            'provinsi' => MRegion::query()->select('id', 'name', 'parent_id')->where('type', 'provinsi')->get()->toArray(),
            'kabupaten' => MRegion::query()->select('id', 'name', 'parent_id')->where('type', 'kabupaten')->get()->toArray(),
            'kecamatan' => MRegion::query()->select('id', 'name', 'parent_id')->where('type', 'kecamatan')->get()->toArray(),
        ];
        return Inertia::render('Master/MAssistanceDistributionReports/Verification', [
            'programs' => $programs,
            'regions' => $regions,
            'user' => auth()->user()
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
