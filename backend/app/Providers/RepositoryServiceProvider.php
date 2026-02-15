<?php

namespace App\Providers;

use App\Domains\Ticket\Repositories\EloquentTicketCategoryRepository;
use App\Domains\Ticket\Repositories\EloquentTicketMessageRepository;
use App\Domains\Ticket\Repositories\TicketCategoryRepository;
use App\Domains\Ticket\Repositories\TicketMessageRepository;
use App\Domains\User\Repositories\EloquentUserRepository;
use App\Domains\User\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;
use App\Domains\Ticket\Repositories\TicketRepository;
use App\Domains\Ticket\Repositories\EloquentTicketRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(TicketRepository::class, EloquentTicketRepository::class);
        $this->app->bind(TicketMessageRepository::class, EloquentTicketMessageRepository::class);
        $this->app->bind(UserRepository::class, EloquentUserRepository::class);
        $this->app->bind(TicketCategoryRepository::class, EloquentTicketCategoryRepository::class);
    }
}
