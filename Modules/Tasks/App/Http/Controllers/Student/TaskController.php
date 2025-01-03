<?php

namespace Modules\Tasks\App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Modules\Tasks\App\Services\Contracts\TaskServiceInterface;

class TaskController extends Controller
{
    protected TaskServiceInterface $service;

    public function __construct(TaskServiceInterface $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        try {
            $content = $this->service->get($request->user()->id);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'content' => $content,
        ]);
    }
}
