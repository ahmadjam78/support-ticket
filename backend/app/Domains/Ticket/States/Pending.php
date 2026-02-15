<?php

namespace App\Domains\Ticket\States;

class Pending extends TicketState
{
    public function label(): string
    {
        return 'pending';
    }

    public function isClosed(): bool
    {
        return false;
    }

    public function isOpen(): bool
    {
        return false;
    }
}
