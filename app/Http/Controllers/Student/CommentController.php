<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\StoreCommentRequest;
use App\Models\Comments;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, $taskId)
    {
        $userId = $request->user()->id;
        $content = $request->get('content');
        $comment = new Comments([
            'content' => $content,
            'author' => $userId,
            'task_id' => $taskId
        ]);
        try {
            $comment->save();
        } catch (\Error $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Сообщение успешно отправленно.',
            'content' => $comment->toArray()
        ]);
    }
}
