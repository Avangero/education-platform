<?php

namespace App\Http\Middleware;

use App\Models\Task;
use Closure;

class CheckAccess
{
    public function handle($request, Closure $next)
    {
        $taskId = $request->route('id');
        $userId = auth()->id();

        if (!Task::isMyTask($taskId, $userId)) {
            return response()->json(['message' => 'Доступ к задаче запрещен'], 403);
        }

        return $next($request);
    }
}
