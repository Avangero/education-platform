<?php

namespace Modules\Tasks\App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $fillable = [
        'course_id',
        'title',
        'content',
        'status'
    ];

    public static function isMyTask(int $taskId, int $userId)
    {
        $ids = DB::table('tasks as t')
            ->select('c.student_id', 'c.mentor_id')
            ->join('courses as c', 't.course_id', '=', 'c.id')
            ->where('t.id', '=', $taskId)
            ->first();

        if (!$ids) {
            return false;
        }

        return $ids->student_id === $userId || $ids->mentor_id === $userId;
    }
}
