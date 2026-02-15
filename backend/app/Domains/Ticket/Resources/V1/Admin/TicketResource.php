<?php

namespace App\Domains\Ticket\Resources\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Domains\Ticket\Resources\V1\Admin\TicketMessageResource;

class TicketResource extends JsonResource
{
    public function toArray(Request $request): array
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

            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
                'email' => $this->user?->email,
            ],

            'messages' => TicketMessageResource::collection($this->whenLoaded('messages')),

            'messages_count' => $this->messages_count
                ?? $this->messages()->count(),

        ];
    }
}
