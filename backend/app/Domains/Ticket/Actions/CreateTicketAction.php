<?php

namespace App\Domains\Ticket\Actions;

use App\Domains\Ticket\Repositories\TicketRepository;
use App\Domains\Ticket\DTOs\CreateTicketDTO;

class CreateTicketAction
{
    public function __construct(
        private TicketRepository $repository
    ) {}

    public function execute(CreateTicketDTO $dto)
    {
        $ticket = $this->repository->create([
            'user_id'     => $dto->user_id,
            'category_id' => $dto->category_id,
            'subject'     => $dto->subject,
            'priority'    => $dto->priority,
        ]);

        $message = $ticket->messages()->create([
            'user_id' => $dto->user_id,
            'message' => $dto->description,
        ]);

        foreach ($dto->attachments as $file) {
            $message
                ->addMedia($file)
                ->toMediaCollection('attachments');
        }

        return $ticket;
    }
}
