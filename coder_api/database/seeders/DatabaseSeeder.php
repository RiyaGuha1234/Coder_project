<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseType;
use App\Models\StudentToCourse;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        CourseType::create(['type'=>'monthly course']);
        CourseType::create(['type'=>'package course']);


        Course::create(['course_name'=>'C1','course_fees'=>2000,'course_type_id'=>1]);
        Course::create(['course_name'=>'C2','course_fees'=>3000,'course_type_id'=>2]);
        Course::create(['course_name'=>'C3','course_fees'=>2500,'course_type_id'=>1]);
        Course::create(['course_name'=>'C4','course_fees'=>4000,'course_type_id'=>2]);
        Course::create(['course_name'=>'C5','course_fees'=>2080,'course_type_id'=>2]);


        User::create(['user_name'=>'sukantahui','password'=>"81dc9bdb52d04dc20036dbd8313ed055"]);

        \App\Models\Student::factory(40)->create();

//        StudentToCourse::create(['student_id'=>1,'course_id'=>2]);
//        StudentToCourse::create(['student_id'=>2,'course_id'=>2]);
//        StudentToCourse::create(['student_id'=>3,'course_id'=>4]);
//        StudentToCourse::create(['student_id'=>1,'course_id'=>1]);
//        StudentToCourse::create(['student_id'=>2,'course_id'=>1]);
//        StudentToCourse::create(['student_id'=>3,'course_id'=>2]);
//        StudentToCourse::create(['student_id'=>5,'course_id'=>2]);
//        StudentToCourse::create(['student_id'=>6,'course_id'=>5]);
    }
}
