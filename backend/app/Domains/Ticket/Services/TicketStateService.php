<?php

namespace App\Domains\Ticket\Services;

use App\Domains\Ticket\Models\Ticket;
use App\Domains\Ticket\States\Closed;
use App\Domains\Ticket\States\Open;
use App\Domains\Ticket\States\Pending;
use Illuminate\Support\Facades\DB;

class TicketStateService
{
    public function open(Ticket $ticket): void
    {
        DB::transaction(function () use ($ticket) {
            $ticket->status->transitionTo(Open::class);
        });
    }

    public function pending(Ticket $ticket): void
    {
        DB::transaction(function () use ($ticket) {
            $ticket->status->transitionTo(Pending::class);
        });
    }

    public function close(Ticket $ticket): void
    {
        DB::transaction(function () use ($ticket) {
            $ticket->status->transitionTo(Closed::class);
        });
    }
}
