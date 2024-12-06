<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

abstract class Controller extends \Illuminate\Routing\Controller
{
    const RESPONSE_GET = "Data berhasil diload";
    const RESPONSE_CREATE = "Data Berhasil dibuat";
    const RESPONSE_UPDATE = "Data berhasil diubah";
    const RESPONSE_DELETE = "Data berhasil dihapus";
    const RESPONSE_NOT_FOUND = "Data tidak ditemukan";

    /**
     * Success response.
     *
     * @param mixed|null $data
     * @param string $message
     * @param int $status
     * @return JsonResponse
     */
    protected function successResponse(mixed $data = null, string $message = 'Success', int $status = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    /**
     * Error response.
     *
     * @param string $message
     * @param mixed|null $errors
     * @param int $status
     * @return JsonResponse
     */
    protected function errorResponse(string $message = 'Error', mixed $errors = null, int $status = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }
}
