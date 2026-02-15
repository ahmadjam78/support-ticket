<?php

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;

class CreateTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Policy handles authorization
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:ticket_categories,id'],
            'subject'     => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'priority'    => ['required', 'in:low,medium,high'],
            'attachments.*' => ['nullable', 'file', 'max:2048'],
        ];
    }


    public function messages(): array
    {
        return [
            'priority.in' => 'Priority must be low, medium or high.',
        ];
    }
}
