<?php

namespace Database\Seeders\dev;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'name' => 'Василий',
                'surname' => 'Иванов',
                'email' => 'admin@test.ru',
                'role' => 1,
                'password' => bcrypt('admin')
            ],
            [
                'id' => 2,
                'name' => 'Иван',
                'surname' => 'Петров',
                'email' => 'mentor@test.ru',
                'role' => 2,
                'password' => bcrypt('mentor')
            ],
            [
                'id' => 3,
                'name' => 'Иван',
                'surname' => 'Иванов',
                'email' => 'student@test.ru',
                'role' => 3,
                'password' => bcrypt('student')
            ],
        ];
        DB::table('users')->insert($data);
    }
}
