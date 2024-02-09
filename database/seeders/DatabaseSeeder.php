<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    protected array $prod = [
        prod\RolesTableSeeder::class,
    ];

    protected array $dev = [
        dev\UsersSeeder::class,
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
