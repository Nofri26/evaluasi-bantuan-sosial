<?php

namespace Database\Factories\Master;

use App\Enum\Master\MAssistanceDistributionReport\AssistanceDistributionReportStatus;
use App\Enum\Master\MRegions\RegionType;
use App\Models\Master;
use App\Models\Master\MAssistanceDistributionReport;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MAssistanceDistributionReport>
 */
class MAssistanceDistributionReportFactory extends Factory
{
    protected $model = Master\MAssistanceDistributionReport::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $program = Master\MProgram::query()->inRandomOrder()->first();
        $region = Master\MRegion::query()->where('type', RegionType::KECAMATAN)->inRandomOrder()->first();
        return [
            'program_id' => $program,
            'region_id' => $region,
            'date' => $this->faker->date(),
            'attachment' => $this->faker->filePath(),
            'description' => $this->faker->text(200),
            'status' => $this->faker->randomElement(AssistanceDistributionReportStatus::class),
        ];
    }
}
