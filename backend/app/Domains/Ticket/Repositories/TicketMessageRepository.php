<?php

namespace App\Domains\Ticket\Repositories;

use App\Domains\Ticket\Models\TicketMessage;

interface TicketMessageRepository
{
    public function create(array $data): TicketMessage;
}
