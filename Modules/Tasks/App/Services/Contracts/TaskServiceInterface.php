<?php

namespace Modules\Tasks\App\Services\Contracts;

interface TaskServiceInterface
{
    public function get(int $userId): array;
}
