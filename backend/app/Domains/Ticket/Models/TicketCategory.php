<?php

namespace App\Domains\Ticket\Models;

use Illuminate\Database\Eloquent\Model;

class TicketCategory extends Model
{
    protected $fillable = [
        'name',
        'parent_id',
    ];

    public function parent()
    {
        return $this->belongsTo(TicketCategory::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(TicketCategory::class, 'parent_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'category_id');
    }

    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive');
    }
}
