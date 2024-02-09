<?php

namespace Modules\Tasks\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class TasksDatabaseSeeder extends Seeder
{
    protected array $prod = [
        prod\CourseStatuseSeeder::class,
        prod\TaskStatusSeeder::class,
    ];

    protected array $dev = [
        dev\CourseSeeder::class,
        dev\TasksSeeder::class,
        dev\CommentsSeeder::class,
    ];

    public function run(): void
    {
        $call = $this->prod;

        if (App::environment() === 'local') {
            $call = array_merge($call, $this->dev);
        }

        $this->call($call);
    }
}
