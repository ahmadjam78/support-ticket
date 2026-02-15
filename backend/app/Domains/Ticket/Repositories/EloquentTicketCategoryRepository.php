<?php

namespace App\Domains\Ticket\Repositories;

use App\Domains\Ticket\Models\TicketCategory;
use App\Domains\Ticket\Repositories\TicketCategoryRepository;
use Illuminate\Database\Eloquent\Collection;

class EloquentTicketCategoryRepository implements TicketCategoryRepository
{
    public function allWithChildren(): Collection
    {
        return TicketCategory::with('children')->whereNull('parent_id')->get();
    }

    public function allNested(): Collection
    {
        return TicketCategory::with('childrenRecursive')->whereNull('parent_id')->get();
    }
}
