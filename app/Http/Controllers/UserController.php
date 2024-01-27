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
        $roleId =  $user->role;
        $roleTitle = DB::table('roles')->select('title')->where('id', '=', $roleId)->value('title');
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'surname' => $user->surname,
            'role_id' => $user->role,
            'role_title' => $roleTitle
        ]);
    }
}
