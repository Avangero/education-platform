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
            \Modules\Tasks\Database\Seeders\prod\CourseStatuseSeeder::class,
            \Modules\Tasks\Database\Seeders\prod\TaskStatusSeeder::class,

            Seeders\dev\UsersSeeder::class,
            \Modules\Tasks\Database\Seeders\dev\CourseSeeder::class,
            \Modules\Tasks\Database\Seeders\dev\TasksSeeder::class,
            \Modules\Tasks\Database\Seeders\dev\CommentsSeeder::class
        ]);
    }
}
