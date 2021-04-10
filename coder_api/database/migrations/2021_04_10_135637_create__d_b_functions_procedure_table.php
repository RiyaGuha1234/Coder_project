<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateDBFunctionsProcedureTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      DB::unprepared('DROP FUNCTION IF EXISTS coder_db.get_total_due;
                            CREATE FUNCTION coder_db.`get_total_due`(`param_course_id` INT, param_student_id INT) RETURNS double
                                DETERMINISTIC
                            BEGIN
                                  DECLARE temp_total_fees double;
                                  DECLARE temp_total_month int;

                                  select if(TIMESTAMPDIFF(month, effective_date , CURRENT_DATE())<1,1,TIMESTAMPDIFF(month, effective_date , CURRENT_DATE())) into temp_total_month from students where id = param_student_id;

                                  select if(course_types.id =1,student_to_courses.fees_for_student * temp_total_month,student_to_courses.fees_for_student) into temp_total_fees
                                  from student_to_courses
                                  inner join courses ON courses.id = student_to_courses.course_id
                                  inner join course_types ON course_types.id = courses.course_type_id
                                  where student_to_courses.course_id = param_course_id AND student_to_courses.student_id = param_student_id ;

                            RETURN temp_total_fees;
                    END;'
      );
      DB::unprepared('DROP FUNCTION IF EXISTS coder_db.get_fees_due;
                            CREATE FUNCTION coder_db.`get_fees_due`(`param_course_id` INT, param_student_id INT) RETURNS double
                                DETERMINISTIC
                            BEGIN
                                  DECLARE temp_total_fees double;
                                  DECLARE temp_total_fees_paid double;
                                  DECLARE temp_fees_due double;
                                  DECLARE temp_total_month int;

                                        select if(TIMESTAMPDIFF(month, effective_date , CURRENT_DATE())<1,1,TIMESTAMPDIFF(month, effective_date , CURRENT_DATE())) into temp_total_month from students where id = param_student_id;

                                        select if(course_types.id =1,student_to_courses.fees_for_student * temp_total_month,student_to_courses.fees_for_student) into temp_total_fees
                                        from student_to_courses
                                        inner join courses ON courses.id = student_to_courses.course_id
                                        inner join course_types ON course_types.id = courses.course_type_id
                                        where student_to_courses.course_id = param_course_id AND student_to_courses.student_id = param_student_id ;


                                         select ifNull(sum(fees_paid),0)  into temp_total_fees_paid  from fees where student_id = param_student_id AND course_id = param_course_id;

                                         select temp_total_fees - temp_total_fees_paid  into temp_fees_due;

                                  IF temp_fees_due IS NULL THEN
                                      RETURN 0;
                                  END IF;
                                  RETURN temp_fees_due;
                            END;'
      );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('_d_b_functions_procedure');
    }
}
