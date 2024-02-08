<?php

namespace Modules\Tasks\Database\Seeders\prod;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskStatusSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'status' => 'Не начато'
            ],
            [
                'id' => 2,
                'title' => 'В работе'
            ],
            [
                'id' => 3,
                'title' => 'На проверке'
            ],
            [
                'id' => 4,
                'title' => 'Выполнено'
            ],
        ];

        DB::table('task_status')->insert($data);
    }
}
