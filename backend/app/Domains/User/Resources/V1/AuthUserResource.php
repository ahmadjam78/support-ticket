<?php

namespace App\Domains\User\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'    => $this->id,
            'name'  => $this->name,
            'email' => $this->email,

            // Role optional
            'role' => $this->whenLoaded(
                'roles',
                fn () => $this->roles->pluck('name')->first()
            ),

            'created_at' => $this->created_at,
        ];
    }
}
