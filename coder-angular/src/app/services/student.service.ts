import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Student} from '../models/student.model';
import {Subject, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../models/course.model';
import {formatDate} from '@angular/common';
import {GlobalVariable} from '../shared/GlobalVariable';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentData: Student[] = [];
  studentDataSub = new Subject<Student[]>();
  studentForm: FormGroup;
  currentDate =  new Date();
  date = formatDate(this.currentDate , 'dd/MM/yyyy', 'en');

  studentDataSubUpdateListener(){
    return this.studentDataSub.asObservable();
  }

  constructor(private http: HttpClient) {
    // this.http.get('http://127.0.0.1:8000/api/getStudents').subscribe((response: {success: number, data: Student[]}) => {
    this.http.get(GlobalVariable.API_URL + 'getStudents').subscribe((response: {success: number, data: Student[]}) => {
      this.studentData = response.data;
      this.studentDataSub.next(this.studentData);
    });

    this.studentForm = new FormGroup({
      id : new FormControl(null),
      student_name : new FormControl(null, [Validators.required]),
      contact : new FormControl('+91', [ Validators.required, Validators.maxLength(15)]),
      address: new FormControl(null),
      date: new FormControl(this.date),
      effective_date: new FormControl(null)
    });

  }

  saveStudentData(){
    // return this.http.post('http://127.0.0.1:8000/api/saveStudent', this.studentForm.value)
    return this.http.post(GlobalVariable.API_URL + 'saveStudent', this.studentForm.value)
      .pipe( tap((response: {success: number, data: Student})  => {
        this.studentData.unshift(response.data);
        this.studentDataSub.next(this.studentData);
      }));
  }


  getStudents(){
    return[...this.studentData];
  }

  updateStudent(){
    // return this.http.post('http://127.0.0.1:8000/api/updateStudent', this.studentForm.value)
    return this.http.post(GlobalVariable.API_URL + 'updateStudent', this.studentForm.value)
      .pipe(catchError(this._serverError), tap((response: {success: number, data: Student}) => {
        if (response.success === 1 ){
          const index = this.studentData.findIndex(x => x.id === response.data.id );
          if (index !== -1){
            this.studentData.splice(index,1, response.data);
            this.studentDataSub.next(this.studentData);
          }

        }
      }));
  }
  deleteStudent(id){
    // return this.http.delete('http://127.0.0.1:8000/api/delete/' + id)
    return this.http.delete(GlobalVariable.API_URL + 'delete/' + id)
      .pipe(catchError(this._serverError), tap((response: {success: number, data: any , status: number}) => {
        if (response.success === 1 ){
          console.log(response);
          const index = this.studentData.findIndex(x => x.id === id);
          if(index !== -1){
            this.studentData.splice(index,1);
          }
        }
      }));
  }


//-----method for getting status code in response-----------

//   deleteStudent(id){
//     return this.http.delete(GlobalVariable.API_URL + 'delete/' + id , { observe: 'response'}).subscribe((response) => {
//       console.log(response);
//     }, error => {
//       console.log(error);
//     });
//   }

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
