<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserDetailResource;


class UserController extends Controller
{
    public function index()
    {
        $user = User::all();
        return UserResource::collection($user);
    }
    public function findById($id)
    {
        $user = User::findOrFail($id);
        return new UserDetailResource($user);
    }
}