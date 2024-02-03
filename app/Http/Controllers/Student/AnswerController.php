<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnswerController extends Controller
{
    public function store(Request $request, int $taskId)
    {
        $name = $request->input('name');
        $data = $request->input('data');

        $decodedData = base64_decode(preg_replace('#^data:\w+/\w+;base64,#i', '', $data));

        $path = "uploads/answer/task/{$taskId}/$name";

        if (Storage::put($path, $decodedData)) {
            return response()->json(['message' => 'Файл успешно загружен']);
        } else {
            return response()->json(['message' => 'Ошибка при сохранении файла'], 500);
        }
    }

    public function destroy(Request $request, int $taskId)
    {
        $name = $request->input('name');
        $path = "uploads/answer/task/{$taskId}/$name";

        if (Storage::get($path)) {
            Storage::delete($path);
        }

        return response()->json(['message' => 'Файл успешно удален']);
    }
}
