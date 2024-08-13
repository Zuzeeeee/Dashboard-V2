<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class SearchCardRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  public function all($keys = null)
  {
    $data = parent::all($keys);
    $data['id'] = $this->route('id');
    return $data;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'id' => 'required|exists:users',
    ];
  }

  public function messages(): array
  {
    return [
      'id.exists' => 'User not found.',
    ];
  }

  protected function failedValidation(Validator $validator)
  {
    throw (new ValidationException($validator))
      ->errorBag($this->errorBag)
      ->redirectTo($this->getRedirectUrl())
      ->status(404);
  }
}