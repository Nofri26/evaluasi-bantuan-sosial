<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'role' => 'admin',
                'email' => 'admin@admin.com',
            ],
            [
                'name' => 'User',
                'role' => 'user',
                'email' => 'user@user.com',
            ]
        ];
        User::factory()->createMany($users);
        $this->call(Master\MRegionSeeder::class);
        $this->call(Master\MProgramSeeder::class);
    }
}
