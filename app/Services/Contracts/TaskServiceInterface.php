<?php

namespace App\Services\Contracts;

interface TaskServiceInterface
{
    public function get(int $userId): array;
}
