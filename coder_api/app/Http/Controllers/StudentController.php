<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getStudents()
    {
        $result = Student::all();

        return response()->json(['success'=>1,'data'=>$result],200,[],JSON_NUMERIC_CHECK);

    }

    public function saveStudent(Request $request){

//        return $request;

        $student = new Student();
        $student->student_name = $request->student_name;
        $student->contact = $request->contact;
        $student->address = $request->address;
        $student->date = $request->date;
        $student->save();

        if($student){
            return response()->json(['success'=>1,'data'=>$student],200,[],JSON_NUMERIC_CHECK);
        }
        else
            return response()->json(['success'=>0,'data'=>$student],200,[],JSON_NUMERIC_CHECK);

    }

    public function updateStudent(Request $request){
        $student = Student::find($request->id);
        $student->student_name = $request->student_name;
        $student->contact = $request->contact;
        $student->address = $request->address;
        if($request->effective_date){
            $student->effective_date = $request->effective_date;
        }
        $student->update();

        if($student){
            return response()->json(['success'=>1,'data'=>$student],200,[],JSON_NUMERIC_CHECK);
        }
        else{
            return response()->json(['success'=>0,'data'=>$student],200,[],JSON_NUMERIC_CHECK);
        }
    }

    public  function  delete($id){
        $student = Student::destroy($id);
        if($student){
            return response()->json(['success'=>1,'data'=>$student],200,[],JSON_NUMERIC_CHECK);
        }
        else{
            return response()->json(['success'=>0,'data'=>$student],200,[],JSON_NUMERIC_CHECK);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

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
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student)
    {
        //
    }
}
