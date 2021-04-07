import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesDueService {
  studentDueFeesData: any[] = [];
  studentDueFeesDataSub = new Subject<any>();


  getStudentFeesDataUpdateListener(){
    return this.studentDueFeesDataSub.asObservable();
  }

  constructor(private  http: HttpClient) {
    this.http.get('http://127.0.0.1:8000/api/getDueFees').subscribe((response:{success: number , data: any[]}) => {
      this.studentDueFeesData = response.data;
      this.studentDueFeesDataSub.next(this.studentDueFeesData);
    });
  }
  getDueFeesList(){
    return [...this.studentDueFeesData];
  }
  getUpdatedDueFeesList(){
    this.http.get('http://127.0.0.1:8000/api/getDueFees').subscribe((response: {success: number , data: any[]}) => {
      this.studentDueFeesData = response.data;
      this.studentDueFeesDataSub.next(this.studentDueFeesData);
    });
  }
}
