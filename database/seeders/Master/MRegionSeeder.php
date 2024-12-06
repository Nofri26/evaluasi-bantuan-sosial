<?php

namespace Database\Seeders\Master;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MRegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provinces = [
            ['name' => 'Jawa Barat', 'type' => 'Provinsi', 'parent_id' => null],
            ['name' => 'Jawa Tengah', 'type' => 'Provinsi', 'parent_id' => null],
        ];

        foreach ($provinces as $province) {
            $provinceId = DB::table('m_regions')->insertGetId($province);

            $kabupatens = [
                ['name' => 'Bandung', 'type' => 'Kabupaten', 'parent_id' => $provinceId],
                ['name' => 'Bogor', 'type' => 'Kabupaten', 'parent_id' => $provinceId],
            ];

            foreach ($kabupatens as $kabupaten) {
                $kabupatenId = DB::table('m_regions')->insertGetId($kabupaten);

                $kecamatans = [
                    ['name' => 'Cileunyi', 'type' => 'Kecamatan', 'parent_id' => $kabupatenId],
                    ['name' => 'Cimahi', 'type' => 'Kecamatan', 'parent_id' => $kabupatenId],
                ];

                DB::table('m_regions')->insert($kecamatans);
            }
        }
    }
}
