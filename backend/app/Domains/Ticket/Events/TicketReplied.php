<?php

namespace App\Domains\Ticket\Events;

use App\Domains\Ticket\Models\TicketMessage;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TicketReplied
{
    use Dispatchable, SerializesModels;

    public TicketMessage $message;

    public function __construct(TicketMessage $message)
    {
        $this->message = $message;
    }
}
