<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    public function  setCourseType(){
        return $this->belongsTo('App\Models\CourseType','course_type_id');
    }

}
