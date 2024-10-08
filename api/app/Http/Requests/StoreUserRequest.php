<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreUserRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'name' => 'required|string|min:3|max:255',
      'surname' => 'required|string',
      'phone' => 'required',
      'email' => 'required|email|unique:users',
      'birthDate' => 'required|date',
      'cep' => 'required',
      'street' => 'required|string',
      'city' => 'required|string',
      'province' => 'required|string',
    ];
  }

  public function messages(): array
  {
    return [
      'street.required' => 'Missing street name.'
    ];
  }

  protected function failedValidation(Validator $validator)
  {
    throw (new ValidationException($validator))
      ->errorBag($this->errorBag)
      ->redirectTo($this->getRedirectUrl())
      ->status(400);
  }
}