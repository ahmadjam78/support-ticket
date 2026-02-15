<?php

namespace App\Domains\User\DTOs;

class LoginUserDTO
{
    public function __construct(
        public string $email,
        public string $password
    ) {}
}
