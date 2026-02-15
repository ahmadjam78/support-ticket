<?php

namespace App\Domains\Ticket\DTOs;

use App\Shared\DTOs\BaseDTO;

class ReplyTicketDTO extends BaseDTO
{
    public function __construct(
        public readonly int $ticket_id,
        public readonly int $user_id,
        public readonly string $message,
        public array $attachments = []
    ) {}
}
