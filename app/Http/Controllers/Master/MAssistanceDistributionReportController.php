<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\MAssistanceDistributionReportRequest;
use App\Http\Resources\Master\MAssistanceDistributionReportResource;
use App\Models\Master\MAssistanceDistributionReport;
use Illuminate\Http\JsonResponse;

class MAssistanceDistributionReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $assistanceDistributionReport = MAssistanceDistributionReport::query()->with(['program', 'region'])->paginate(10);

        if ($assistanceDistributionReport->isEmpty()) {
            return $this->errorResponse(self::RESPONSE_NOT_FOUND, null, 404);
        }

        return $this->successResponse(
            new MAssistanceDistributionReportResource($assistanceDistributionReport),
            self::RESPONSE_GET
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

        $assistanceDistributionReport = MAssistanceDistributionReport::query()->create($validated);

        return $this->successResponse(
            new MAssistanceDistributionReportResource($assistanceDistributionReport),
            self::RESPONSE_CREATE
        );
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

        $assistanceDistributionReport->update($validated);

        return $this->successResponse(
            new MAssistanceDistributionReportResource($assistanceDistributionReport),
            self::RESPONSE_UPDATE
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
