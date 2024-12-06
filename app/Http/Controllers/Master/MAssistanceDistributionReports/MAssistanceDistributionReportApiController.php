<?php

namespace App\Http\Controllers\Master\MAssistanceDistributionReports;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\MAssistanceDistributionReportRequest;
use App\Http\Resources\Master\MAssistanceDistributionReportResource;
use App\Models\Master\MAssistanceDistributionReport;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MAssistanceDistributionReportApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('length', 10);
        $search = $request->get('search')['value'] ?? '';
        $orderColumn = $request->get('order')[0]['column'] ?? '';
        $orderDirection = $request->get('order')[0]['dir'] ?? 'asc';

        $query = MAssistanceDistributionReport::query()
            ->with(['program', 'region', 'region.parent.parent']);

        if ($search) {
            $query->whereHas('program', function ($query) use ($search) {
                $query->where('name', 'like', "%$search%");
            });
        }

        $columns = ['id', 'program_id', 'region_id', 'date', 'status'];
        if ($orderColumn !== '' && isset($columns[$orderColumn])) {
            $query->orderBy($columns[$orderColumn], $orderDirection);
        }

        $assistanceDistributionReport = $query->paginate($perPage);

        $data = $assistanceDistributionReport->map(function ($report) {
            $region = $report->region;

            return [
                'id' => $report->id,
                'program' => $report->program->name,
                'kecamatan' => $region->name,
                'kabupaten' => $region->parent ? $region->parent->name : null,
                'provinsi' => $region->parent && $region->parent->parent ? $region->parent->parent->name : null,
                'date' => $report->date,
                'attachment' => $report->attachment,
                'description' => $report->description,
                'status' => $report->status
            ];
        });

        return $this->successResponse([
            'draw' => $request->get('draw'),
            'recordsTotal' => MAssistanceDistributionReport::count(),
            'recordsFiltered' => $assistanceDistributionReport->total(),
            'data' => $assistanceDistributionReport,
        ], self::RESPONSE_GET);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        $assistanceDistributionReport = MAssistanceDistributionReport::query()->find($id);

        if (!$assistanceDistributionReport) {
            return $this->errorResponse(self::RESPONSE_NOT_FOUND, null, 404);
        }

        return $this->successResponse(
            new MAssistanceDistributionReportResource($assistanceDistributionReport),
            self::RESPONSE_GET
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param MAssistanceDistributionReportRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(MAssistanceDistributionReportRequest $request, int $id): JsonResponse
    {
        $validated = $request->validated();
        $assistanceDistributionReport = MAssistanceDistributionReport::query()->find($id);

        if (!$assistanceDistributionReport) {
            return $this->errorResponse(self::RESPONSE_NOT_FOUND, null, 404);
        }

        if ($request->hasFile('attachment')) {
            $filePath = $request->file('attachment')->store('assistance-distribution-report', 'public');
            $validated['attachment'] = $filePath;
        }

        $assistanceDistributionReport->update($validated);

        return $this->successResponse(
            new MAssistanceDistributionReportResource($assistanceDistributionReport),
            self::RESPONSE_UPDATE
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param MAssistanceDistributionReportRequest $request
     * @return JsonResponse
     */
    public function store(MAssistanceDistributionReportRequest $request): JsonResponse
    {
        $validated = $request->validated();
        if ($request->hasFile('attachment')) {
            $filePath = $request->file('attachment')->store('assistance-distribution-report', 'public');
            $validated['attachment'] = $filePath;
        }
        $assistanceDistributionReport = MAssistanceDistributionReport::query()->create($validated);

        return $this->successResponse(
            new MAssistanceDistributionReportResource($assistanceDistributionReport),
            self::RESPONSE_CREATE
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $assistanceDistributionReport = MAssistanceDistributionReport::query()->find($id);
        $assistanceDistributionReport->delete();

        return $this->successResponse(null, self::RESPONSE_DELETE);
    }
}
