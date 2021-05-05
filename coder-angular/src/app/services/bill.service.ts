import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../shared/GlobalVariable';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  billedStudentsData: any[] = [];
  billDetailsData: any;
  billedStudentSub = new Subject<any[]>();
  billDetailsDataSub = new Subject<any>();

  getBilledStudentUpdateListener(){
    return this.billedStudentSub.asObservable();
  }
  billDetailDataUpdateListener(){
    return this.billDetailsDataSub.asObservable();
  }
  constructor(private http: HttpClient) {
    this.http.get(GlobalVariable.API_URL + 'getBilledStudents').subscribe((response: {success: number, data: any[]}) => {
      if (response.data){
        this.billedStudentsData = response.data;
        this.billedStudentSub.next([...this.billedStudentsData]);
      }
    });
  }
  getBillDetailsByStudent(data){
    console.log(data);
    return this.http.get(GlobalVariable.API_URL +  'getBillDetails/' + data);
  }
  getBill(data){
    return this.http.get(GlobalVariable.API_URL + 'getBill/' + data).pipe(tap((response: {success: number, data: any}) => {
        this.billDetailsData  = response.data;
        // console.log([...this.billDetailsData]);
        this.billDetailsDataSub.next([...this.billDetailsData]);
    }));
  }

  getBillData(){
    return [...this.billDetailsData];
  }

  getUpdatedBilledStudentData(){

      console.log('getUpdatedBilledStudentData invoked');
      this.http.get(GlobalVariable.API_URL + 'getBilledStudents').subscribe((response: {success: number, data: any[]}) => {
      if (response.data){
        this.billedStudentsData = response.data;
        this.billedStudentSub.next([...this.billedStudentsData]);
      }
    });
  }

  getBilledStudentData(){
    return [...this.billedStudentsData];
  }

}
