import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {Student} from '../../models/student.model';
import {FormGroup} from '@angular/forms';
import {FeesService} from '../../services/fees.service';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import {Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import {BillComponent} from '../bill/bill.component';
import {Overlay} from '@angular/cdk/overlay';


// export interface DialogData {
//    billInfo: any;
//
// }

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {
  studentList: Student[];
  feesEntryForm: FormGroup;
  searchString: string;
  pageSize: number;
  p = 1;
  minDate = new Date(2010, 11, 2);
  maxDate = new Date(2023, 3, 2);
  // currentDate = new Date();
  // feesDate =  formatDate(this.currentDate , 'dd/MM/yyyy', 'en');
  currentDate = new Date();
  feesDate =  formatDate(this.currentDate , 'dd/MM/yyyy', 'en');
  courseListByStudent: any[] = [];
  showDue = false;
  dueByStudent: any;
  feesPaid: any[];
  savedBillIfo: any;
  billInfo: any;
  discountEnabled = false;
  constructor(private  studentService: StudentService , private  feesService: FeesService , public dialog: MatDialog) {
    this.studentList = this.studentService.getStudents();
  }

  ngOnInit(): void {
    this.discountEnabled = false;
    this.showDue = false;
    this.searchString = null;
    this.pageSize = 5;
    this.feesEntryForm = this.feesService.feesEntryForm;
    this.studentService.studentDataSubUpdateListener().subscribe((response) => {
      this.studentList = response;
    });
    this.feesService.dueByStudentDataUpdateListener().subscribe((response) => {
      this.dueByStudent = response;
    });
  }
  populateFeesFormByStudent(item){
    this.showDue = false;
    this.feesService.getCourseByStudent(item.id).subscribe((response: {success: number , data: any[]}) => {
      this.courseListByStudent = response.data;
    });
    this.feesEntryForm.patchValue({id: item.id , student_name: item.student_name});
    const x = formatDate(this.currentDate, 'yyyy-MM-dd', 'en');
    if (x > item.closing_date){
      this.discountEnabled = true;
      console.log(this.discountEnabled);
    }

  }

  clearForm(){
    // this.feesEntryForm.reset();
    // this.feesEntryForm.patchValue({date: this.feesDate});
    this.feesEntryForm.controls[('fees')].reset();
  }


  submitFeesByStudent(item){

    // console.log(item);
    // const formDate = this.feesEntryForm.value.date;
    // console.log( formDate);




    console.log( this.feesEntryForm.value.date);

    if (this.feesEntryForm.value.fees === null){
      Swal.fire('Please enter fees before submitting !!!', '', 'error');
    }
    else{
      Swal.fire({
        title: 'Are you sure to submit the fees?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm ?',
        cancelButtonText: 'Decline'
      }).then((result) => {
        if (result.value){
          this.feesService.submitFees(item).subscribe((response) => {
            if (response){
              Swal.fire('fees has been submiited',
                '',
                'success');
              // this.feesEntryForm.reset();
              // this.feesEntryForm.patchValue({student_name: item.student_name, date: this.feesDate});
              this.feesEntryForm.controls[('fees')].reset();
              this.feesService.viewDueFees(item);
              // this.feesDueService.getUpdatedDueFeesList();
              this.feesEntryForm.patchValue({date: this.feesDate});
              this.showDue = false;
            }
          }, (error) => {
            Swal.fire(error.statusText, '', 'error');
          } );
        }
      });
    }
  }
  viewDue(item){
    console.log(item);
    this.feesService.viewDueFees(item).subscribe((response:{success: number , data1: any, data2: any}) => {
      if (response.data2){
        this.dueByStudent = response.data2;
        console.log(this.dueByStudent[0]);
        this.showDue = true;
      }
      if (response.data1){
        this.feesPaid  = response.data1;
      }
    });
  }



  openDialog() {
    this.feesService.getBillInfo(this.feesEntryForm.value.id);
    let dialogConfig = new MatDialogConfig();

    dialogConfig = {
      data: { savedBillIfo: this.savedBillIfo , billInfo: this.billInfo },
      width: '80%',   height : '95%',
      panelClass: 'custom-dialog-container'
    };
    this.dialog.open(BillComponent  , dialogConfig);
  }


  setDiscount(studentId, courseId){
      this.feesService.setDiscount(studentId, courseId).subscribe((response:{success: number , data: any}) => {
        if (response){
          Swal.fire('Success', 'Discount has been set', 'success');
        }
      });
  }


  backToPrevious(){
    this.showDue = false;
  }




}
