<?php

namespace Modules\Tasks\App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $table = 'courses';

    protected $fillable = [
        'mentor_id',
        'student_id',
        'status',
        'start_date',
        'end_date'
    ];
}
