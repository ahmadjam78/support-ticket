<?php

namespace App\Domains\Ticket\Actions;

use App\Domains\Ticket\DTOs\ReplyTicketDTO;
use App\Domains\Ticket\Models\TicketMessage;
use App\Domains\Ticket\Repositories\TicketMessageRepository;

class ReplyTicketAction
{
    public function __construct(
        private TicketMessageRepository $repository
    ) {}

    public function execute(ReplyTicketDTO $dto): TicketMessage
    {
        $message = $this->repository->create([
            'ticket_id' => $dto->ticket_id,
            'user_id'   => $dto->user_id,
            'message'   => $dto->message,
        ]);

        foreach ($dto->attachments as $file) {
            $message
                ->addMedia($file)
                ->toMediaCollection('attachments');
        }

        return $message;
    }
}
