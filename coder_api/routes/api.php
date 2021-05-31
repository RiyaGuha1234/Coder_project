<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentToCourseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FeesController;
use App\Http\Controllers\BillMasterController;
use App\Http\Controllers\CourseTypeController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::get('getStudents',[StudentController::class,'getStudents']);
    Route::post('updateStudent',[StudentController::class,'updateStudent']);
    Route::delete('delete/{id}',[StudentController::class,'delete']);
    Route::post('saveFees',[FeesController::class,'save']);
//    Route::get('getDueFees',[FeesController::class,'getDueFees']);
    Route::post('saveStudent',[StudentController::class,'saveStudent']);
    Route::post('saveStudent',[StudentController::class,'saveStudent']);
    Route::get('getCourses',[CourseController::class,'getCourses']);
    Route::post('saveCourse/{id}',[StudentToCourseController::class,'save']);
    Route::get('getStudentToCourse/{id}',[StudentToCourseController::class,'get']);
    Route::get('getCourseByStudent/{id}',[StudentToCourseController::class,'getCourseByStudent']);
    Route::post('dueFees',[FeesController::class,'getDueFees']);
    Route::post('getBillInfo',[FeesController::class,'getBillInfo']);
    Route::post('setDiscount',[StudentToCourseController::class,'setDiscount']);
    Route::post('getCourseByStudent',[StudentController::class,'getCourseByStudent']);
    Route::post('editCourseInfo',[StudentToCourseController::class,'editCourseInfo']);
    Route::post('saveBill',[BillMasterController::class,'saveBill']);
    Route::get('getCourseTypes',[CourseTypeController::class,'index']);
    Route::post('save',[CourseController::class,'save']);
    Route::put('update',[CourseController::class,'update']);
    Route::delete('deleteCourse/{id}',[CourseController::class,'delete']);
    Route::get('getBilledStudents',[BillMasterController::class,'getBilledStudents']);
    Route::get('getBillDetails/{id}',[BillMasterController::class,'getBillDetails']);
    Route::get('getBill/{id}',[BillMasterController::class,'getBill']);

});
Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);

Route::get('test',[StudentToCourseController::class,'testJoin']);

//Route::get('getStudents',[StudentController::class,'getStudents']);
//Route::post('saveStudent',[StudentController::class,'saveStudent']);

//Route::post('saveStudent',[StudentController::class,'saveStudent']);
//Route::get('getCourses',[CourseController::class,'getCourses']);
//Route::post('saveCourse/{id}',[StudentToCourseController::class,'save']);
//
//Route::get('getDueFees',[FeesController::class,'getDueFees']);
