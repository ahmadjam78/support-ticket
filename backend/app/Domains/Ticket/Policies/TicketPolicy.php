<?php

namespace App\Domains\Ticket\Policies;

use App\Domains\User\Models\User;
use App\Domains\Ticket\Models\Ticket;

class TicketPolicy
{
    public function view(User $user, Ticket $ticket): bool
    {
        return $user->isAdmin() || $ticket->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->isCustomer();
    }

    public function reply(User $user, Ticket $ticket): bool
    {
        if ($ticket->status->isClosed()) {
            return false;
        }

        return $user->isAdmin() || $ticket->user_id === $user->id;
    }

    public function close(User $user, Ticket $ticket): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Ticket $ticket): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Ticket $ticket): bool
    {
        return $user->isAdmin();
    }
}
