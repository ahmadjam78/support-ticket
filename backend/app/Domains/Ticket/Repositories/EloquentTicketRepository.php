<?php

namespace App\Domains\Ticket\Repositories;

use App\Domains\Ticket\Models\Ticket;
use Spatie\QueryBuilder\QueryBuilder;

class EloquentTicketRepository implements TicketRepository
{
    public function paginateForUser($user)
    {
        $query = QueryBuilder::for(Ticket::class)
            ->allowedFilters(['priority'])
            ->allowedSorts(['created_at'])
            ->latest()
            ->with('user');

        if (!$user->hasRole('admin')) {
            $query->where('user_id', $user->id);
        }

        return $query->paginate(10);
    }

    public function findById(int $id): Ticket
    {
        return Ticket::with('messages.user')->findOrFail($id);
    }

    public function create(array $data): Ticket
    {
        return Ticket::create($data);
    }

    public function paginateForAdmin($user)
    {
        $tickets = QueryBuilder::for(Ticket::class)
            ->allowedFilters(['priority', 'state'])
            ->allowedSorts(['created_at'])
            ->latest()
            ->with(['user']);

        return $tickets->paginate(10);
    }
}
