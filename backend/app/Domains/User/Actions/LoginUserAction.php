<?php

namespace App\Domains\User\Actions;

use App\Domains\User\DTOs\LoginUserDTO;
use Illuminate\Support\Facades\Auth;

class LoginUserAction
{
    public function execute(LoginUserDTO $dto): ?\App\Domains\User\Models\User
    {
        $user = Auth::getProvider()->retrieveByCredentials([
            'email' => $dto->email,
            'password' => $dto->password
        ]);

        if ($user && Auth::validate(['email'=>$dto->email,'password'=>$dto->password])) {
            return $user;
        }

        return null;
    }
}
