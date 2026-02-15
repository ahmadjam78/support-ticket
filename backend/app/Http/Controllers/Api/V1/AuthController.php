<?php

namespace App\Http\Controllers\Api\V1;

use App\Domains\User\Resources\V1\AuthMessageResource;
use App\Domains\User\Resources\V1\AuthUserResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Domains\User\Services\AuthService;
use App\Domains\User\DTOs\RegisterUserDTO;
use App\Domains\User\DTOs\LoginUserDTO;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;

class AuthController extends Controller
{
    public function __construct(private AuthService $authService)
    {
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $dto = new RegisterUserDTO(
            name: $request->name,
            email: $request->email,
            password: $request->password
        );

        $user = $this->authService->register($dto);

        return (new AuthUserResource($user))
            ->response()
            ->setStatusCode(201);
    }

    public function login(LoginRequest $request)
    {
        $dto = new LoginUserDTO(
            email: $request->email,
            password: $request->password
        );

        try {
            $user = $this->authService->login($dto);
        } catch (\DomainException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 401);
        }

        $request->session()->regenerate();

        return new AuthUserResource($user);
    }

    public function logout(Request $request): AuthMessageResource
    {
        auth()->guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return new AuthMessageResource([
            'message' => 'Logged out'
        ]);
    }

    // Get current user
    public function me(Request $request): AuthUserResource
    {
        $user = $request->user()->load('roles');

        return new AuthUserResource($user);
    }
}
