<?php

namespace Modules\Tasks\App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStatusRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'status' => 'required|int',
        ];
    }
}
