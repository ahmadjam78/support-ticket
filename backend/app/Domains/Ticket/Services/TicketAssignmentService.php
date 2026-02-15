<?php

namespace App\Domains\Ticket\Services;

use App\Domains\Ticket\Models\Ticket;
use App\Domains\User\Models\User;

class TicketAssignmentService
{
    public function autoAssign(Ticket $ticket): void
    {
        $agent = User::role('admin')
            ->inRandomOrder()
            ->first();

        if ($agent) {
            $ticket->update([
                'assigned_to' => $agent->id
            ]);
        }
    }

    public function assignTo(Ticket $ticket, User $agent): Ticket
    {
        $ticket->update([
            'assigned_to' => $agent->id
        ]);

        return $ticket;
    }
}
