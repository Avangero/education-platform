<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\StoreCommentRequest;
use App\Models\Comments;
use App\Models\Task;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, $taskId)
    {
        $userId = $request->user()->id;
        $content = $request->get('content');

        if (!Task::isMyTask($taskId, $userId)) {
            return response()->json(['message' => 'Доступ к задаче запрещен'], 403);
        }

        $comment = new Comments([
            'content' => $content,
            'author' => $userId,
            'task_id' => $taskId
        ]);

        $comment->save();

        return response()->json($comment->toArray());
    }
}
