<?php

namespace Database\Seeders;

use Database\Seeders;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            Seeders\prod\RolesTableSeeder::class,
            Seeders\prod\CourseStatuseSeeder::class,
            Seeders\prod\TaskStatusSeeder::class,

            Seeders\dev\UsersSeeder::class,
            Seeders\dev\CourseSeeder::class,
            Seeders\dev\TasksSeeder::class,
            Seeders\dev\CommentsSeeder::class
        ]);

    }
}
