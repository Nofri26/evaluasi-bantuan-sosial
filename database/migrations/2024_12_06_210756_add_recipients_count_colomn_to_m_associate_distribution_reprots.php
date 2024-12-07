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
        Schema::table('m_assistance_distribution_reports', function (Blueprint $table) {
            $table->integer('recipients_count')->after('region_id')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('m_assistance_distribution_reports', function (Blueprint $table) {
            $table->dropColumn('recipients_count');
        });
    }
};
