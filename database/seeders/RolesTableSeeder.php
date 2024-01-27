<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'title' => 'Админ'
            ],
            [
                'id' => 2,
                'title' => 'Наставник'
            ],
            [
                'id' => 3,
                'title' => 'Студент'
            ],
        ];

        DB::table('roles')->insert($data);
    }
}
