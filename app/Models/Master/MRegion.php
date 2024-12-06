<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MRegion extends Model
{
    /** @use HasFactory<\Database\Factories\Master\MRegionFactory> */
    use HasFactory;
    protected $fillable = ['name', 'parent_id', 'type'];

    public function parent()
    {
        return $this->belongsTo(MRegion::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(MRegion::class, 'parent_id');
    }
}
