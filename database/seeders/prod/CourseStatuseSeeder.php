<?php

namespace Database\Seeders\prod;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseStatuseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'status' => 'На подтверждении'
            ],
            [
                'id' => 2,
                'title' => 'Делать'
            ],
            [
                'id' => 3,
                'title' => 'В работе'
            ],
            [
                'id' => 4,
                'title' => 'Выполненно'
            ],
        ];

        DB::table('course_status')->insert($data);
    }
}