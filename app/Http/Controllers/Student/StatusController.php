<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\UpdateStatusRequest;
use App\Models\Task;
use App\Models\TaskStatus;

class StatusController extends Controller
{
    public function update(UpdateStatusRequest $request, int $taskId)
    {
        $status = $request->get('status');
        $task = Task::find($taskId);

        $task->status = $status;

        try {
            $task->save();
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 409);
        }

        return response()->json([
            'message' => 'Статус успешно изменен',
            'content' => [
                'id' => $task->status,
                'status' => TaskStatus::find($task->status)->status
            ]
        ]);
    }
}
