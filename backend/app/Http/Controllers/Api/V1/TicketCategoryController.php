<?php

namespace App\Http\Controllers\Api\V1;

use App\Domains\Ticket\Repositories\TicketCategoryRepository;
use App\Http\Controllers\Controller;
use App\Domains\Ticket\Resources\V1\TicketCategoryResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TicketCategoryController extends Controller
{
    protected TicketCategoryRepository $repository;

    public function __construct(TicketCategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(): AnonymousResourceCollection
    {
        $categories = $this->repository->allWithChildren();

        return TicketCategoryResource::collection($categories);
    }
}
