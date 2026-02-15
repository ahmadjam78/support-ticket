<?php

namespace App\Domains\Ticket\Models;

use App\Domains\User\Models\User;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class TicketMessage extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'ticket_id',
        'user_id',
        'message',
    ];

    // Relations
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments')
            ->useDisk('public')
            ->acceptsMimeTypes([
                'image/jpeg',
                'image/png',
                'application/pdf',
                'application/zip'
            ]);
    }
}
