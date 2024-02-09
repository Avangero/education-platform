<?php

namespace Modules\Tasks\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class TasksDatabaseSeeder extends Seeder
{
    protected array $prod = [];
    protected array $dev = [];

    public function __construct()
    {
        $this->prod = $this->getSeeders('prod');
        $this->dev = $this->getSeeders('dev');
    }

    public function run(): void
    {
        $call = $this->prod;

        if (App::environment() === 'local') {
            $call = array_merge($call, $this->dev);
        }

        $this->call($call);
    }

    protected function getSeeders(string $folder): array
    {
        $seeders = [];

        $files = glob(__DIR__ . "/{$folder}/*.php");

        foreach ($files as $file) {
            $className = __NAMESPACE__ . '\\' . $folder . '\\' . basename($file, '.php');
            $seeders[] = $className;
        }

        return $seeders;
    }
}
