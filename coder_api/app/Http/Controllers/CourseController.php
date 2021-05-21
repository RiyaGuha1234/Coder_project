<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCourses()
    {
        $result = Course::select('courses.id','courses.course_name','courses.course_fees','course_types.type','courses.course_type_id')
                  ->join('course_types','courses.course_type_id','=','course_types.id')
                  ->get();

        return response()->json(['success'=>100,'data'=>$result],200,[],JSON_NUMERIC_CHECK);
    }

    public  function save(Request $request){
        $course =  new Course();
        $course->course_name =  $request->course_name;
        $course->course_fees =  $request->course_fees;
        $course->course_type_id =  $request->course_type_id;
        $course->save();
        $course->setAttribute('type',$course->setCourseType->type);

        return response()->json(['success'=>100,'data'=>$course],200,[],JSON_NUMERIC_CHECK);
    }

    public function update(Request $request){

        $course = Course::find($request->id);

        $course->course_name = $request->course_name;
        $course->course_fees = $request->course_fees;
        $course->course_type_id = $request->course_type_id;
        $course->update();

        $course->setAttribute('type',$course->setCourseType->type);

        return response()->json(['success'=>100,'data'=>$course],200,[],JSON_NUMERIC_CHECK);

    }

    public function delete($id)
    {
        $course = Course::where('id',$id)->delete();

        return response()->json(['success'=>100,'data'=>$course],200,[],JSON_NUMERIC_CHECK);
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
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course)
    {
        //
    }
}
