<?php

namespace App\Repositories\Contracts;

interface TaskRepositoryInterface
{
    public function getCourseDetails(): object;

    public function getMentorDetails($mentorId): object;

    public function getTasks(): array;

    public function getTaskComments(): array;
}
