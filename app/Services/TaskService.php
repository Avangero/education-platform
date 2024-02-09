<?php

namespace App\Services;

use App\Repositories\Contracts\TaskRepositoryInterface;
use App\Services\Contracts\TaskServiceInterface;
use Illuminate\Support\Facades\Storage;

class TaskService implements TaskServiceInterface
{
    protected TaskRepositoryInterface $repository;

    public function __construct(TaskRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function get(int $userId): array
    {
        $course = $this->repository->getCourseDetails($userId);

        if (!$course) {
            return [];
        }

        $user = $this->repository->getMentorDetails($course->mentor_id);

        $tasks = $this->repository->getTasks();

        $comments = $this->repository->getTaskComments();

        $tasksWithComments = $this->mergeTasks($tasks, $comments);

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

    protected function mergeTasks($tasks, $comments)
    {
        foreach ($tasks as $task) {
            $taskComments = $comments[$task->id] ?? [];

            foreach ($taskComments as $comment) {
                unset($comment->task_id);
            }

            $task->comments = $taskComments;
            $task->answers = $this->getFiles($task->id);
        }

        return $tasks;
    }

    protected function getFiles(int $taskId): array
    {
        $files = [];
        $path = "uploads/answer/task/";

        $filesFromStorage = Storage::files($path . $taskId);

        foreach ($filesFromStorage as $path) {
            $files[] =  [
                'data' => base64_encode(Storage::get($path)),
                'name' => basename($path)
            ];
        }

        return $files;
    }
}
