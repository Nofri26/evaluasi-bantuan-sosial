<?php

namespace Database\Seeders\Master;

use App\Models\Master\MAssistanceDistributionReport;
use Illuminate\Database\Seeder;

class MAssistanceDistributionReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MAssistanceDistributionReport::factory(20)->create();
    }
}
