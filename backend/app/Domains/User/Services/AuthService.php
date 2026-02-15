<?php

namespace App\Domains\User\Services;

use App\Domains\User\Actions\RegisterUserAction;
use App\Domains\User\Actions\LoginUserAction;
use App\Domains\User\DTOs\RegisterUserDTO;
use App\Domains\User\DTOs\LoginUserDTO;
use App\Domains\User\Events\UserRegistered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function __construct(
        private RegisterUserAction $registerAction,
        private LoginUserAction $loginAction,
    ) {}

    public function register(RegisterUserDTO $dto)
    {
        // Hash password
        $dto->password = Hash::make($dto->password);

        $user = $this->registerAction->execute($dto);

        $user->assignRole('customer');

        UserRegistered::dispatch($user);

        return $user;
    }

    public function login(LoginUserDTO $dto)
    {
        $user = $this->loginAction->execute($dto);

        if (!$user) {
            throw new \DomainException('Invalid credentials');
        }

        Auth::login($user);

        return $user;
    }
}
