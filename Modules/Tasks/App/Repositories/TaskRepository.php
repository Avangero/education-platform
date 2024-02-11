<?php

namespace Modules\Tasks\App\Repositories;

use Illuminate\Support\Facades\DB;
use Modules\Tasks\App\Repositories\Contracts\TaskRepositoryInterface;

class TaskRepository implements TaskRepositoryInterface
{
    public function getCourseDetails(int $userId): ?object
    {
        return DB::table('courses as c')
            ->select('c.id', 'c.start_date', 'c.end_date', 'cs.status', 'c.mentor_id')
            ->join('course_status as cs', 'c.status', '=', 'cs.id')
            ->where('c.end_date', '=', null)
            ->where('c.student_id', '=', $userId)
            ->first();
    }

    public function getMentorDetails($mentorId): object
    {
        return DB::table('users as u')
            ->select('u.id', 'u.name', 'u.surname', 'r.title as role')
            ->join('roles as r', 'u.role', '=', 'r.id')
            ->where('u.id', '=', $mentorId)
            ->first();
    }

    public function getTasks(): array
    {
        return DB::table('tasks as t')
            ->select('t.id', 't.title', 't.content', 'ta.status', 't.start_date', 't.end_date')
            ->join('task_status as ta', 't.status', '=', 'ta.id')
            ->get()
            ->toArray();
    }

    public function getTaskComments(): array
    {
        return DB::table('comments')
            ->select('id', 'author', 'content', 'created_at', 'task_id')
            ->get()
            ->groupBy('task_id')
            ->toArray();
    }
}
