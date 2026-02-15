<?php

namespace App\Domains\Ticket\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class TicketCategoryResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'        => $this->id,
            'name'      => $this->name,
            'parent_id' => $this->parent_id,
            'children'  => TicketCategoryResource::collection($this->whenLoaded('children')),
        ];
    }
}
