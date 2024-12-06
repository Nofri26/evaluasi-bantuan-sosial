<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('m_assistance_distribution_reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('program_id');
            $table->unsignedBigInteger('region_id');
            $table->date('date');
            $table->string('attachment');
            $table->text('description');
            $table->enum('status', ['pending', 'approve', 'reject'])->default('pending');
            $table->timestamps();

            $table->foreign('program_id')->references('id')->on('m_programs')->onDelete('cascade');
            $table->foreign('region_id')->references('id')->on('m_regions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_assistance_distribution_reports');
    }
};
