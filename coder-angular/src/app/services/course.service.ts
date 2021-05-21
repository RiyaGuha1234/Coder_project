import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../shared/GlobalVariable';
import {Course} from '../models/course.model';
import {Subject, throwError} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseType} from '../models/course-type';
import {tap, map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseList: Course [] = [];
  courseListSub = new Subject <Course[]>();
  courseTypeList: CourseType[] = [];
  courseForm: FormGroup;

  getCourseUpdateListener(){
    return this.courseListSub.asObservable();
  }
  constructor(private  http: HttpClient) {

    this.courseForm =  new FormGroup({
      id : new FormControl(null),
      course_name : new FormControl(null,  [Validators.required]),
      course_fees : new FormControl(null, [Validators.required]),
      course_type_id : new FormControl(null, [Validators.required]),
    });

    this.http.get(GlobalVariable.API_URL + 'getCourses').subscribe((response: { success: number , data: Course[]}) => {
        this.courseList = response.data;
        this.courseListSub.next([...this.courseList]);
    });


  }
  getCourseTypes(){
    return this.http.get(GlobalVariable.API_URL + 'getCourseTypes');
  }

  saveCourse(){
    return this.http.post(GlobalVariable.API_URL + 'save', this.courseForm.value)
      .pipe(catchError(this._serverError), tap((response: {success: number ,  data: Course}) => {
       if (response.data){
         this.courseList.unshift(response.data);
         this.courseListSub.next([...this.courseList]);
       }
    }));
  }

  update(){
    return this.http.put(GlobalVariable.API_URL + 'update', this.courseForm.value)
      .pipe(catchError(this._serverError),(tap((response:{success: number ,  data: Course}) => {
      if (response.data){
        const index = this.courseList.findIndex(x => x.id === this.courseForm.value.id);
        if (index !== 1){
          this.courseList.splice(index, 1, response.data);
          this.courseListSub.next([...this.courseList]);
        }
      }
    })));
  }
  delete(data){
    return this.http.delete(GlobalVariable.API_URL + 'deleteCourse/' + data)
      .pipe(catchError(this._serverError), (tap((response: {suucess: number ,  data: any}) => {
      if (response.data){
        const index = this.courseList.findIndex(x => x.id === data);
        if (index !== -1){
          this.courseList.splice(index, 1);
          console.log(this.courseList);
          this.courseListSub.next([...this.courseList]);
        }
      }
    })));
  }

  private _serverError(err: any) {
    if (err instanceof Response) {
      return throwError('backend server error');
      // if you're using lite-server, use the following line
      // instead of the line above:
      // return Observable.throw(err.text() || 'backend server error');
    }
    if (err.status === 200){
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
