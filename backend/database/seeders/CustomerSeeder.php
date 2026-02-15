<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Domains\User\Models\User;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            [
                'name' => 'Alice Johnson',
                'email' => 'alice@example.com',
            ],
            [
                'name' => 'Bob Smith',
                'email' => 'bob@example.com',
            ],
        ];

        foreach ($customers as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make('password'),
                ]
            );

            $user->assignRole('customer');
        }
    }
}
