<?php

namespace Modules\Tasks\Database\Seeders\dev;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentsSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'task_id' => 1,
                'author' => 2,
                'content' => 'Тестовый комент для таски от ментора',
                'created_at' => Carbon::now(),
            ],
            [
                'id' => 2,
                'task_id' => 1,
                'author' => 3,
                'content' => 'Тестовый ответ для таски от студента',
                'created_at' => Carbon::now(),
            ],
        ];

        DB::table('comments')->insert($data);
    }
}
