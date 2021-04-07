<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentToCourseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FeesController;


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
    Route::get('getDueFees',[FeesController::class,'getDueFees']);
    Route::post('saveStudent',[StudentController::class,'saveStudent']);
    Route::post('saveStudent',[StudentController::class,'saveStudent']);
    Route::get('getCourses',[CourseController::class,'getCourses']);
    Route::post('saveCourse/{id}',[StudentToCourseController::class,'save']);
    Route::get('getStudentToCourse/{id}',[StudentToCourseController::class,'get']);
    Route::get('getCourseByStudent/{id}',[StudentToCourseController::class,'getCourseByStudent']);
    Route::post('dueFees',[FeesController::class,'getDueFees']);
});
Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);

//Route::post('saveStudent',[StudentController::class,'saveStudent']);
//Route::get('getCourses',[CourseController::class,'getCourses']);
//Route::post('saveCourse/{id}',[StudentToCourseController::class,'save']);
//
//Route::get('getDueFees',[FeesController::class,'getDueFees']);
