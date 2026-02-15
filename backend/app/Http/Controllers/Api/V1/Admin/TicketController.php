<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Domains\Ticket\DTOs\ReplyTicketDTO;
use App\Domains\Ticket\Resources\V1\Admin\TicketResource;
use App\Domains\Ticket\Resources\V1\Customer\TicketMessageResource;
use App\Domains\Ticket\Services\TicketService;
use App\Http\Requests\Ticket\ReplyTicketRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Domains\Ticket\Models\Ticket;
use App\Domains\Ticket\Services\TicketStateService;
use App\Domains\Ticket\Repositories\TicketRepository;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class TicketController extends Controller
{
    public function __construct()
    {
    }

    /**
     * List all tickets (Admin)
     */
    public function index(
        Request $request,
        TicketRepository $repository
    ): AnonymousResourceCollection
    {

        $tickets = $repository->paginateForAdmin($request);

        return TicketResource::collection($tickets);
    }

    /**
     * Show ticket details
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show(Ticket $ticket): JsonResponse
    {
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

    /**
     * Move ticket to In Progress
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function open(
        Ticket $ticket,
        TicketStateService $service
    ): JsonResponse {

        $this->authorize('update', $ticket);

        $service->open($ticket);

        return response()->json([
            'message' => 'Ticket moved to In Progress',
            'data' => new TicketResource($ticket->fresh())
        ]);
    }


    /**
     * Close ticket
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function closed(
        Ticket $ticket,
        TicketStateService $service
    ): JsonResponse {

        $this->authorize('close', $ticket);

        $service->close($ticket);

        return response()->json([
            'message' => 'Ticket closed successfully',
            'data' => new TicketResource($ticket->fresh())
        ]);
    }

    /**
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function pending(
        Ticket $ticket,
        TicketStateService $service
    ): JsonResponse {

        $this->authorize('update', $ticket);

        $service->pending($ticket);

        return response()->json([
            'message' => 'Ticket moved to Pending',
            'data' => new TicketResource($ticket->fresh())
        ]);
    }


    /**
     * Delete ticket
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy(Ticket $ticket): Response
    {
        $this->authorize('delete', $ticket);

        $ticket->delete();

        return response()->noContent();
    }
}
