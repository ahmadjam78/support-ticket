<?php

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;

class ReplyTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Policy handles it in controller
    }

    public function rules(): array
    {
        return [
            'message' => ['required', 'string', 'min:2'],
            'attachments.*' => ['nullable', 'file', 'max:2048'],
        ];
    }
}
