<?php

namespace App\Models\Master;

use Database\Factories\Master\MAssistanceDistributionReportFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MAssistanceDistributionReport extends Model
{
    /** @use HasFactory<MAssistanceDistributionReportFactory> */
    use HasFactory;

    protected $fillable = [
        'program_id',
        'region_id',
        'date',
        'attachment',
        'description',
        'status',
    ];

    /**
     * @return BelongsTo
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(MProgram::class, 'program_id');
    }

    /**
     * @return BelongsTo
     */
    public function region(): BelongsTo
    {
        return $this->belongsTo(MRegion::class, 'region_id');
    }
}
