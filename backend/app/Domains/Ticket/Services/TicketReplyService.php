<?php

namespace App\Domains\Ticket\Services;

use App\Domains\Ticket\Models\Ticket;
use App\Domains\Ticket\Events\TicketReplied;
use App\Domains\Ticket\DTOs\ReplyTicketDTO;
use App\Domains\Ticket\Actions\ReplyTicketAction;
use Illuminate\Support\Facades\DB;
use DomainException;

class TicketReplyService
{
    public function __construct(
        private ReplyTicketAction $replyAction
    ) {}

    public function reply(ReplyTicketDTO $dto)
    {
        return DB::transaction(function () use ($dto) {

            // Lock ticket row
            $ticket = Ticket::lockForUpdate()
                ->findOrFail($dto->ticket_id);

            // Business rule
            if ($ticket->status === 'closed') {
                throw new DomainException(
                    'Cannot reply to a closed ticket.'
                );
            }

            // Create message
            $message = $this->replyAction->execute($dto);

            // Reopen if needed
            if ($ticket->status === 'resolved') {
                $ticket->update(['status' => 'open']);
            }

            // Dispatch domain event AFTER commit
            DB::afterCommit(function () use ($message) {
                TicketReplied::dispatch($message);
            });

            return $message->load('user');
        });
    }
}
