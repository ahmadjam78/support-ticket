<?php

namespace App\Domains\Ticket\DTOs;

use App\Shared\DTOs\BaseDTO;

class CreateTicketDTO extends BaseDTO
{
    public function __construct(
        public int $user_id,
        public int $category_id,
        public string $subject,
        public string $description,
        public string $priority,
        public array $attachments = []
    ) {}

}
