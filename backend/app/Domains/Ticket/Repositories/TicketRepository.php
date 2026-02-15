<?php

namespace App\Domains\Ticket\Repositories;

use App\Domains\Ticket\Models\Ticket;

interface TicketRepository
{
    public function paginateForAdmin($user);
    public function paginateForUser($user);
    public function findById(int $id): Ticket;
    public function create(array $data): Ticket;
}
