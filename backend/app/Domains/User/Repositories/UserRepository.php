<?php

namespace App\Domains\User\Repositories;

use App\Domains\User\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

interface UserRepository
{
    public function create(array $data): User;
    public function findByEmail(string $email): ?User;
    public function paginate(int $perPage = 20): LengthAwarePaginator;
}
