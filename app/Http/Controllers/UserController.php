<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;

    public function get(Request $request)
    {
        $user = $request->user();

        $content = [
            'id' => $user->id,
            'name' => $user->name,
            'surname' => $user->surname,
            'role_id' => $user->role,
            'role_title' => $user->getRoleTitle()
        ];

        return response()->json([
            'message' => 'Вы успешно вошли',
            'content' => $content
        ]);
    }
}
