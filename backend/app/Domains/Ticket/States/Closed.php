<?php

namespace App\Domains\Ticket\States;

class Closed extends TicketState
{
    public function label(): string
    {
        return 'closed';
    }

    public function isClosed(): bool
    {
        return true;
    }

    public function isOpen(): bool
    {
        return false;
    }
}
