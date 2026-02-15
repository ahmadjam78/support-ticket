<?php
namespace App\Shared\Enums;

enum TicketStatus: string
{
    case Open = 'open';
    case Pending = 'pending';
    case Closed = 'closed';
}
