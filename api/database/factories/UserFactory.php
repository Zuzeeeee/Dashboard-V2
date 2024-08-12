<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake('pt_BR')->name(),
            'surname' => fake('pt_BR')->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'birthDate' => now('18 years ago'),
            'phone' => fake('pt_BR')->phoneNumber,
            'cep' => fake('pt_BR')->postcode(),
            'street' => fake('pt_BR')->streetName(),
            'city' => fake('pt_BR')->city(),
            'province' => fake('pt_BR')->streetAddress(),
        ];
    }
}
