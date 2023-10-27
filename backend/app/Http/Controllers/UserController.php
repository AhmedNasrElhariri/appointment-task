<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function users(Request $request)
    {
        $type = $request->type;


        switch ($type) {
            case 'users':
                $users = User::all();
                break;
            case 'patients':
                $users = User::where('type', '=', 'Patient')->get();
                break;
            case 'doctors':
                $users = User::where('type', '=', 'Doctor')->get();
                break;
            default:
                $users = [];
                break;
        }
        return response()->json($users);
    }
}
