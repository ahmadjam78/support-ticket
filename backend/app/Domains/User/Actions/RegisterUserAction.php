<?php

namespace App\Domains\User\Actions;

use App\Domains\User\DTOs\RegisterUserDTO;
use App\Domains\User\Models\User;
use App\Domains\User\Repositories\UserRepository;

class RegisterUserAction
{
    public function __construct(private UserRepository $repository) {}

    public function execute(RegisterUserDTO $dto): User
    {
        return $this->repository->create((array) $dto);
    }
}
