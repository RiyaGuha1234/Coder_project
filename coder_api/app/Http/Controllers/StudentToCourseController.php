<?php

namespace App\Http\Controllers;

use App\Models\StudentToCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentToCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public  function  get($id){
        $data = StudentToCourse::select()->where('student_id',$id)->get();
        return response()->json(['success'=>1,'data'=>$data],200,[],JSON_NUMERIC_CHECK);

    }
    public function save(Request $request, $id)
    {

            $courses = (object) $request['courseInfo'];
            $data = new StudentToCourse();
            $data->student_id = $id ;
            $data->course_id = $courses->id;
            $data->fees_for_student = $courses->course_fees;
            $data->effective_date = date('y-m-d');
            $data->save();

            if($data){
                return response()->json(['success'=>1,'data'=>$data],200,[],JSON_NUMERIC_CHECK);
            }
            else{
                return response()->json(['success'=>0,'data'=>$data],200,[],JSON_NUMERIC_CHECK);
            }


    }

    public function getCourseByStudent($id){
        $result = StudentToCourse::select('student_to_courses.id','student_to_courses.student_id','student_to_courses.course_id','courses.course_name','student_to_courses.effective_date','student_to_courses.closing_date','student_to_courses.inforce')
                  ->join('courses','student_to_courses.course_id','=','courses.id')
                  ->where('student_to_courses.student_id',$id)
//                  ->where('student_to_courses.inforce',1)
                  ->get();

        return response()->json(['success'=>1,'data'=>$result],200,[],JSON_NUMERIC_CHECK);
    }


    public  function  setDiscount(Request $request){
        $result = StudentToCourse::where('student_id',$request->studentId)
                  ->where('course_id',$request->courseId)
                  ->first();

        $result->discount = $request->discount;
        $result->update();

        return response()->json(['success'=>1,'data'=>$result],200,[],JSON_NUMERIC_CHECK);

    }

    public  function  editCourseInfo(Request $request){
        $result = StudentToCourse::find($request->id);
        $result->effective_date  = $request->effective_date;
        if($request->closing_date){
            $result->closing_date  = $request->closing_date;
            $result->inforce = 0;
        }

        $result->update();

        return response()->json(['success'=>1,'data'=>$result],200,[],JSON_NUMERIC_CHECK);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StudentToCourse  $studentToCourse
     * @return \Illuminate\Http\Response
     */
    public function show(StudentToCourse $studentToCourse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StudentToCourse  $studentToCourse
     * @return \Illuminate\Http\Response
     */
    public function edit(StudentToCourse $studentToCourse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StudentToCourse  $studentToCourse
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StudentToCourse $studentToCourse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StudentToCourse  $studentToCourse
     * @return \Illuminate\Http\Response
     */
    public function destroy(StudentToCourse $studentToCourse)
    {
        //
    }
}
