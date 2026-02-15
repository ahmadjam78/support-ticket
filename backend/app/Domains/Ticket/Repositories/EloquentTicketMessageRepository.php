<?php

namespace App\Domains\Ticket\Repositories;

use App\Domains\Ticket\Models\TicketMessage;

class EloquentTicketMessageRepository implements TicketMessageRepository
{
    public function create(array $data): TicketMessage
    {
        return TicketMessage::create($data);
    }
}
