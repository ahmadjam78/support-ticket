<?php

namespace App\Domains\Ticket\Resources\V1\Customer;

use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'category_id' => $this->category_id,
            'subject' => $this->subject,
            'status' => strtolower(class_basename($this->status)),
            'priority' => $this->priority->value ?? $this->priority,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'messages' => TicketMessageResource::collection($this->whenLoaded('messages')),
        ];
    }
}

