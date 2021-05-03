<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentToCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_to_courses', function (Blueprint $table) {
            $table->id('id');
            $table->bigInteger('student_id')->unsigned();
            $table ->foreign('student_id')->references('id')->on('students');

            $table->bigInteger('course_id')->unsigned();
            $table ->foreign('course_id')->references('id')->on('courses');

            $table->double('fees_for_student')->nullable(false);
            $table->double('discount')->default(0);
            $table->date('effective_date')->nullable(true);
            $table->date('closing_date')->nullable(true);

            $table->unique(['student_id','course_id']);

            $table->tinyInteger('inforce')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_to_courses');
    }
}
