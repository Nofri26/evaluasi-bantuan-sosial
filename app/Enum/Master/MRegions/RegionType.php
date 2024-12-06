<?php

namespace App\Enum\Master\MRegions;

enum RegionType: string
{
    case PROVINSI = 'Provinsi';
    case KABUPATEN = 'Kabupaten';
    case KECAMATAN = 'Kecamatan';
}
