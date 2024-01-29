<?php

namespace App\Services;

use App\Repositories\Contracts\TaskRepositoryInterface;
use App\Services\Contracts\TaskServiceInterface;

class TaskService implements TaskServiceInterface
{
    protected TaskRepositoryInterface $repository;

    public function __construct(TaskRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function get(): array
    {
        $course = $this->repository->getCourseDetails();

        $user = $this->repository->getMentorDetails($course->mentor_id);

        $tasks = $this->repository->getTasks();

        $comments = $this->repository->getTaskComments();

        $tasksWithComments = $this->mergeCommentsWithTasks($tasks, $comments);

        return [
            'course' => [
                'id' => $course->id,
                'status' => $course->status,
                'tasks' => $tasksWithComments,
                'mentor' => $user,
                'start_date' => $course->start_date,
                'end_date' => $course->end_date,
            ]
        ];
    }

    protected function mergeCommentsWithTasks($tasks, $comments)
    {
        foreach ($tasks as $task) {
            $taskComments = $comments[$task->id] ?? [];

            foreach ($taskComments as $comment) {
                unset($comment->task_id);
            }

            $task->comments = $taskComments;
            $task->answers = [];
        }

        return $tasks;
    }
}
