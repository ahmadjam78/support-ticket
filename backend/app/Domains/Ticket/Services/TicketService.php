<?php

namespace App\Domains\Ticket\Services;

use App\Domains\Ticket\Events\TicketCreated;
use Illuminate\Support\Facades\DB;
use App\Domains\Ticket\DTOs\CreateTicketDTO;
use App\Domains\Ticket\DTOs\ReplyTicketDTO;
use App\Domains\Ticket\Actions\CreateTicketAction;
use App\Domains\Ticket\Services\TicketReplyService;
use App\Domains\Ticket\Services\TicketAssignmentService;

class TicketService
{
    public function __construct(
        protected CreateTicketAction $createAction,
        protected TicketReplyService $replyService,
        protected TicketAssignmentService $assignmentService
    ) {}

    public function create(CreateTicketDTO $dto)
    {
        return DB::transaction(function () use ($dto) {

            $ticket = $this->createAction->execute($dto);

            TicketCreated::dispatch($ticket);

            $this->assignmentService->autoAssign($ticket);

            return $ticket;
        });
    }


    public function reply(ReplyTicketDTO $dto)
    {
        return $this->replyService->reply($dto);
    }
}
