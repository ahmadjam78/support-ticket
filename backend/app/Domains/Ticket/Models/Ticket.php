<?php

namespace App\Domains\Ticket\Models;

use App\Domains\Ticket\States\TicketState;
use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use App\Shared\Enums\TicketStatus;
use App\Shared\Enums\TicketPriority;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\ModelStates\HasStates;

class Ticket extends Model
{
    use HasStates;
    use LogsActivity;

    protected $fillable = [
        'user_id',
        'category_id',
        'subject',
        'status',
        'priority',
    ];

    protected $casts = [
        'status' => TicketState::class,
        'priority' => TicketPriority::class,
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(TicketCategory::class, 'category_id');
    }

    public function messages()
    {
        return $this->hasMany(TicketMessage::class);
    }

    // Helpers
    public function isOpen(): bool
    {
        return $this->status === TicketStatus::Open;
    }

    public function isClosed(): bool
    {
        return $this->status === TicketStatus::Closed;
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

}
