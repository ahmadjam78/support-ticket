<?php

namespace App\Domains\Ticket\States;

class Open extends TicketState
{
    public function label(): string
    {
        return 'open';
    }

    public function isClosed(): bool
    {
        return false;
    }

    public function isOpen(): bool
    {
        return true;
    }
}
