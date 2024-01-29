<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Services\Contracts\TaskServiceInterface;

class TaskController extends Controller
{
    protected TaskServiceInterface $service;

    public function __construct(TaskServiceInterface $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json($this->service->get());
    }
}
