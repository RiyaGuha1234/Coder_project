<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StudentFactory extends Factory
{
    protected $model = Student::class;
    public function definition()
    {
        return [
            'student_name' => $this->faker->name,
            'contact' => $this->faker->randomNumber($nbDigits = 5, $strict = true).$this->faker->randomNumber($nbDigits = 5, $strict = true),
            'address' => $this->faker->address,
            'date' => '2020-10-12'
//            'course_id' =>function(){
//                return Course::all()->where('id')->random();
//            },



        ];
    }




}
