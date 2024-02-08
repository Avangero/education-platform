<?php

namespace Modules\Tasks\App\Repositories\Contracts;

interface TaskRepositoryInterface
{
    public function getCourseDetails(int $userId): ?object;

    public function getMentorDetails($mentorId): object;

    public function getTasks(): array;

    public function getTaskComments(): array;
}
