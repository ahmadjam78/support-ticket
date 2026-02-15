<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class EloquentUserRepository implements UserRepository
{
    public function create(array $data): User
    {
        return User::create($data);
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function paginate(int $perPage = 20): LengthAwarePaginator
    {
        return User::latest()->paginate($perPage);
    }
}
