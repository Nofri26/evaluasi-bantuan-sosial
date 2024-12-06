<?php

namespace Database\Seeders\Master;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('m_programs')->insert([
            [
                'name' => 'PKH',
                'updated_at' => now(),
                'created_at' => now(),
            ],
            [
                'name' => 'BLT',
                'updated_at' => now(),
                'created_at' => now(),
            ],
            [
                'name' => 'Bansos',
                'updated_at' => now(),
                'created_at' => now(),
            ],
        ]);
    }
}
