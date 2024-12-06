<?php

namespace App\Http\Requests\Master;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class MAssistanceDistributionReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'program_id' => ['required', 'integer', 'exists:m_programs,id'],
            'region_id' => ['required', 'integer', 'exists:m_regions,id'],
            'date' => ['required', 'date'],
            'attachment' => ['required', 'file', 'mimes:jpg,png,pdf', 'max:2048'],
            'description' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'program_id.required' => 'Pilih Program terlebih dahulu',
            'program_id.integer' => 'Program tidak valid',
            'program_id.exists' => 'Program tidak ditemukan',

            'region_id.required' => 'Pilih Region terlebih dahulu',
            'region_id.integer' => 'Region tidak valid',
            'region_id.exists' => 'Region tidak ditemukan',

            'date.required' => 'Tanggal tidak boleh kosong',
            'date.date' => 'Tanggal tidak valid',

            'attachment.required' => 'File tidak boleh kosong',
            'attachment.file' => 'File tidak valid',
            'attachment.mimes' => 'File harus berupa jpg, png, atau pdf',
            'attachment.max' => 'File maksimal 2MB',

            'description.string' => 'Deskripsi tidak valid',
            'description.max' => 'Deskripsi maksimal 255 karakter',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
