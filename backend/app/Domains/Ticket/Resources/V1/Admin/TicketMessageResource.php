<?php

namespace App\Domains\Ticket\Resources\V1\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class TicketMessageResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'ticket_id' => $this->ticket_id,
            'user_id' => $this->user_id,
            'message' => $this->message,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // user relation
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
                'role' => $this->user->role,
            ],

            // attachments
            'attachments' => $this->whenLoaded('media', function () {
                return $this->getMedia('attachments')->map(function ($file) {
                    return [
                        'id' => $file->id,
                        'file_name' => $file->file_name,
                        'original_url' => url('storage/' . $file->id . '/' . $file->file_name),
                        'size' => $file->size,
                        'mime_type' => $file->mime_type,
                    ];
                });
            }),
        ];
    }
}
