<?php

namespace App\Http\Controllers;

use App\Models\Fees;
use App\Models\Student;
use App\Models\StudentToCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $courseData = $request['courseInfo'];
        $data = $request['formInfo'];

        $fees = new Fees();
        $fees->student_id =  $courseData['student_id'];
        $fees->course_id =  $courseData['course_id'];
        $fees->fees_paid = $data['fees'];
        $fees->date = $data['date'];
        $fees->save();


        return response()->json(['success'=>1,'data'=>$fees],200,[],JSON_NUMERIC_CHECK);
    }

//    public  function getDueFees(){
//        $result = Student::select('id','student_name',DB::raw("get_fees_due_by_student_id(id) as due"))->get();
//
//        return response()->json(['success'=>1,'data'=>$result],200,[],JSON_NUMERIC_CHECK);
//
//    }

public function getDueFees(Request $request){


    $result = StudentToCourse::select('student_to_courses.course_id','courses.course_name','course_types.type','student_to_courses.fees_for_student',DB::raw("get_total_due(student_to_courses.course_id,student_to_courses.student_id) as totalDue, ifNull(sum(fees.fees_paid),0) as paid , get_fees_due(student_to_courses.course_id, student_to_courses.student_id)  as due"))
             ->leftJoin('fees', function($join)
             {
                $join->on('fees.course_id', '=', 'student_to_courses.course_id');
                $join->on('fees.student_id','=','student_to_courses.student_id');
             })
             ->join('courses','courses.id','=','student_to_courses.course_id')
             ->join('course_types','course_types.id','=','courses.course_type_id')
            ->where('student_to_courses.student_id', '=', $request->student_id)
            ->where('student_to_courses.course_id', '=', $request->course_id)
            ->groupBy('student_to_courses.course_id','courses.course_name','student_to_courses.fees_for_student','student_to_courses.student_id','course_types.type')
            ->get();




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
     * @param  \App\Models\Fees  $fees
     * @return \Illuminate\Http\Response
     */
    public function show(Fees $fees)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Fees  $fees
     * @return \Illuminate\Http\Response
     */
    public function edit(Fees $fees)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Fees  $fees
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Fees $fees)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Fees  $fees
     * @return \Illuminate\Http\Response
     */
    public function destroy(Fees $fees)
    {
        //
    }
}
