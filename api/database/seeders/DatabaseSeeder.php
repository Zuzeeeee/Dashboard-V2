<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use DateTime;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'birthDate' => new DateTime('18 years ago'),
            'state' => [
                'Acre',
                'Alagoas',
                'Amapá',
                'Amazonas',
                'Bahia',
                'Ceará',
                'Distrito Federal',
                'Espírito Santo',
                'Goías',
                'Maranhão',
                'Mato Grosso',
                'Mato Grosso do Sul',
                'Minas Gerais',
                'Pará',
                'Paraíba',
                'Paraná',
                'Pernambuco',
                'Piauí',
                'Rio de Janeiro',
                'Rio Grande do Norte',
                'Rio Grande do Sul',
                'Rondônia',
                'Roraíma',
                'Santa Catarina',
                'São Paulo',
                'Sergipe',
                'Tocantins',
            ]
        ]);
    }
}

