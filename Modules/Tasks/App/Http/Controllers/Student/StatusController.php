<?php

namespace Modules\Tasks\App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Exception;
use Modules\Tasks\App\Http\Requests\Student\UpdateStatusRequest;
use Modules\Tasks\App\Models\Task;
use Modules\Tasks\App\Models\TaskStatus;

class StatusController extends Controller
{
    public function update(UpdateStatusRequest $request, int $taskId)
    {
        $status = $request->get('status');
        $task = Task::find($taskId);

        $task->status = $status;

        try {
            $task->save();
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Статус успешно изменен',
            'content' => [
                'id' => $task->status,
                'status' => TaskStatus::find($task->status)->status,
            ],
        ]);
    }
}
