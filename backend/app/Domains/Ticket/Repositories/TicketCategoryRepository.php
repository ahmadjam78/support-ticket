<?php

namespace App\Domains\Ticket\Repositories;

use Illuminate\Database\Eloquent\Collection;

interface TicketCategoryRepository
{
    public function allWithChildren(): Collection;
    public function allNested(): Collection;
}
