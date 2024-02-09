<?php

namespace Modules\Tasks\Database\Seeders\dev;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'mentor_id' => 2,
                'student_id' => 3,
                'status' => 2,
            ],
        ];

        DB::table('courses')->insert($data);
    }
}
