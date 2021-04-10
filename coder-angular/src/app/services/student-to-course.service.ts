import { Injectable } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {Course} from '../models/course.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalVariable} from '../shared/GlobalVariable';

@Injectable({
  providedIn: 'root'
})
export class StudentToCourseService {
  courseData: Course[] = [];
  studentToCourseForm: FormGroup;
  studentToCourseData: any;
  studentToCourseDataSub = new Subject<any[]>();

  studentToCourseDataUpdateListener(){
    return this.studentToCourseDataSub.asObservable();
  }

  constructor(private  http: HttpClient) {}

  getCourses() {
    // return this.http.get('http://127.0.0.1:8000/api/getCourses');
    return this.http.get(GlobalVariable.API_URL + 'getCourses');
  }
  addCourse(courseData, id){
    console.log(courseData);
    // return this.http.post('http://127.0.0.1:8000/api/saveCourse/' + id , { courseInfo: courseData} )
    return this.http.post(GlobalVariable.API_URL + 'saveCourse/' + id , { courseInfo: courseData} )
      .pipe(catchError(this._serverError), tap((response: {success: number, data: any}) => {
      }));
  }
  getCourseByStudent(id){
    // return this.http.get('http://127.0.0.1:8000/api/getStudentToCourse/' + id).pipe(catchError(this._serverError), tap((response: {success: number, data: any}) => {
    return this.http.get(GlobalVariable.API_URL + 'getStudentToCourse/' + id).pipe(catchError(this._serverError), tap((response: {success: number, data: any}) => {
    }));
      // this.studentToCourseData = response.data;
      // this.studentToCourseDataSub.next([...this.studentToCourseData]);

  }


  private _serverError(err: any) {
    if (err instanceof Response) {
      return throwError('backend server error');
      // if you're using lite-server, use the following line
      // instead of the line above:
      // return Observable.throw(err.text() || 'backend server error');
    }
    if (err.status === 0){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: 'Backend Server is not Working', statusText: err.statusText});
    }
    if (err.status === 401){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: 'Your are not authorised', statusText: err.statusText});
    }
    if (err.status === 500){
      // tslint:disable-next-line:label-position
      return throwError ({status: err.status, message: '', statusText: err.statusText});
    }
    return throwError(err);
  }
}
