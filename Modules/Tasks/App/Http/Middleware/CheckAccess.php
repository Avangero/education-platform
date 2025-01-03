<?php

namespace Modules\Tasks\App\Http\Middleware;

use Closure;
use Modules\Tasks\App\Models\Task;

class CheckAccess
{
    public function handle($request, Closure $next)
    {
        $taskId = $request->route('id');
        $userId = auth()->id();

        if (! Task::isMyTask($taskId, $userId)) {
            return response()->json(['message' => 'Доступ к задаче запрещен'], 403);
        }

        return $next($request);
    }
}
