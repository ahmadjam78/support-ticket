<?php

namespace App\Http\Controllers\Api\V1\Customer;

use App\Domains\Ticket\Resources\V1\Customer\TicketMessageResource;
use App\Domains\Ticket\Resources\V1\Customer\TicketResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Domains\Ticket\Models\Ticket;
use App\Domains\Ticket\DTOs\CreateTicketDTO;
use App\Domains\Ticket\DTOs\ReplyTicketDTO;
use App\Domains\Ticket\Services\TicketService;
use App\Domains\Ticket\Repositories\TicketRepository;
use App\Http\Requests\Ticket\CreateTicketRequest;
use App\Http\Requests\Ticket\ReplyTicketRequest;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TicketController extends Controller
{
    public function __construct()
    {
    }

    /**
     * List authenticated customer's tickets
     */
    public function index(
        Request $request,
        TicketRepository $repository
    ): AnonymousResourceCollection
    {

        $tickets = $repository->paginateForUser($request->user());

        return TicketResource::collection($tickets);
    }

    /**
     * Create new ticket
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(
        CreateTicketRequest $request,
        TicketService $service
    ): TicketResource
    {

        $this->authorize('create', Ticket::class);

        $dto = CreateTicketDTO::fromArray([
            'user_id'     => $request->user()->id,
            'category_id' => $request->validated()['category_id'],
            'subject'     => $request->validated()['subject'],
            'description' => $request->validated()['description'],
            'priority'    => $request->validated()['priority'],
            'attachments' => $request->file('attachments', []),
        ]);

        $ticket = $service->create($dto);

        return new TicketResource($ticket);

    }

    /**
     * Show ticket details
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show(Ticket $ticket): JsonResponse
    {
        $this->authorize('view', $ticket);

        $ticket->load([
            'messages' => function ($query) {
                $query->with(['user', 'media'])
                    ->orderByDesc('created_at');
            }
        ]);

        return response()->json(new TicketResource($ticket));
    }

    /**
     * Reply to ticket
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function reply(
        ReplyTicketRequest $request,
        Ticket $ticket,
        TicketService $service
    ): TicketMessageResource
    {

        $this->authorize('reply', $ticket);

        $dto = ReplyTicketDTO::fromArray([
            'ticket_id' => $ticket->id,
            'user_id'   => $request->user()->id,
            'message'   => $request->validated()['message'],
            'attachments' => $request->file('attachments', []),
        ]);

        $message = $service->reply($dto);

        return new TicketMessageResource($message);
    }
}
