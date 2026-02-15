<?php

namespace App\Domains\Ticket\States;

use Spatie\ModelStates\Exceptions\InvalidConfig;
use Spatie\ModelStates\State;
use Spatie\ModelStates\StateConfig;

abstract class TicketState extends State
{
    abstract public function label(): string;
    abstract public function isClosed(): bool;
    abstract public function isOpen(): bool;

    /**
     * @throws InvalidConfig
     */
    public static function config(): StateConfig
    {
        return parent::config()
            ->default(Open::class)

            // Allowed transitions
            ->allowTransition(Open::class, Pending::class)
            ->allowTransition(Open::class, Closed::class)

            ->allowTransition(Pending::class, Closed::class)
            ->allowTransition(Pending::class, Open::class);

    }

    public function color(): string
    {
        return match (static::class) {
            Open::class => 'blue',
            Pending::class => 'yellow',
            Closed::class => 'green',
        };
    }
}
