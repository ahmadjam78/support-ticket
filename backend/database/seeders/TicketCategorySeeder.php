<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Domains\Ticket\Models\TicketCategory;

class TicketCategorySeeder extends Seeder
{
    public function run(): void
    {
        $technical = TicketCategory::create(['name' => 'Technical']);
        TicketCategory::create(['name' => 'Server', 'parent_id' => $technical->id]);
        TicketCategory::create(['name' => 'Bug', 'parent_id' => $technical->id]);

        $billing = TicketCategory::create(['name' => 'Billing']);
        TicketCategory::create(['name' => 'Invoice', 'parent_id' => $billing->id]);
        TicketCategory::create(['name' => 'Refund', 'parent_id' => $billing->id]);
    }
}
