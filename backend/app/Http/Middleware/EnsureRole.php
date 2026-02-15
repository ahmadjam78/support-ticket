<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRole
{
    public function handle(Request $request, Closure $next, string $role = 'customer'): Response
    {
        if (!$request->user() || !$request->user()->hasRole($role)) {
            return response()->json([
                'error' => true,
                'message' => 'You do not have permission to access this page.',
                'redirect' => '/login'
            ], 403);
        }

        return $next($request);
    }
}
