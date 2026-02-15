<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role as SpatieRole;
use App\Shared\Enums\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        foreach (Role::values() as $role) {
            SpatieRole::firstOrCreate(['name' => $role]);
        }
    }
}

