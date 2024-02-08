<?php

namespace Modules\Tasks\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Tasks\Database\Seeders\dev\CommentsSeeder;
use Modules\Tasks\Database\Seeders\dev\CourseSeeder;
use Modules\Tasks\Database\Seeders\dev\TasksSeeder;
use Modules\Tasks\Database\Seeders\prod\CourseStatuseSeeder;
use Modules\Tasks\Database\Seeders\prod\TaskStatusSeeder;

class TasksDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CourseStatuseSeeder::class,
            TaskStatusSeeder::class,

            CourseSeeder::class,
            TasksSeeder::class,
            CommentsSeeder::class
        ]);
    }
}
