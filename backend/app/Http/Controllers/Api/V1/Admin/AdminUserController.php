<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Domains\User\Repositories\UserRepository;
use App\Domains\User\Resources\V1\UserResource;

class AdminUserController extends Controller
{
    public function __construct(
        protected UserRepository $users
    ) {}

    public function index()
    {
        $users = $this->users->paginate(20);

        return UserResource::collection($users);
    }
}
