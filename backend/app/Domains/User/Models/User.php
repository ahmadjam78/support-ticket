<?php

namespace App\Domains\User\Models;

use App\Domains\Ticket\Models\Ticket;
use App\Domains\Ticket\Models\TicketMessage;
use App\Shared\Enums\Role;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasRoles, Notifiable;

    protected $guard_name = 'web';
    protected $appends = ['role'];

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    // Relations
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function messages()
    {
        return $this->hasMany(TicketMessage::class);
    }

    public function getRoleAttribute(): ?string
    {
        return $this->roles->pluck('name')->first();
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(Role::ADMIN->value);
    }

    public function isCustomer(): bool
    {
        return $this->hasRole(Role::CUSTOMER->value);
    }
}
