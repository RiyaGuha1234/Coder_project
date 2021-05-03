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
  currentDate = new Date();
  feesDate =  formatDate(this.currentDate , 'dd/MM/yyyy', 'en');
  courseListByStudent: any[] = [];
  showDue = false;
  dueByStudent: any;
  feesPaid: any[];
  savedBillIfo: any;
  billInfo: any;
  discountEnabled = false;
  isPrintReceiptEnabled: boolean;
  showDiscount = false;
  discount: number;
  studentId: number;
  courseId: number;
  constructor(private  studentService: StudentService , private  feesService: FeesService , public dialog: MatDialog) {
    this.studentList = this.studentService.getStudents();
  }

  ngOnInit(): void {
    this.discountEnabled = false;
    this.showDue = false;
    this.searchString = null;
    this.pageSize = 5;
    this.feesEntryForm = this.feesService.feesEntryForm;
    this.isPrintReceiptEnabled =  false;
    this.showDiscount = false;
    this.studentService.studentDataSubUpdateListener().subscribe((response) => {
      this.studentList = response;
    });
    this.feesService.dueByStudentDataUpdateListener().subscribe((response) => {
      this.dueByStudent = response;
    });
  }
  populateFeesFormByStudent(item){
    this.isPrintReceiptEnabled = false;
    this.showDue = false;
    console.log('isPrintReceiptEnabled');
    console.log(this.isPrintReceiptEnabled);
    this.feesEntryForm.patchValue({id: item.id , student_name: item.student_name});
    const x = formatDate(this.currentDate, 'yyyy-MM-dd', 'en');
    if (x > item.closing_date){
      this.discountEnabled = true;
      // console.log(this.discountEnabled);
    }
    this.feesService.getCourseByStudent(item.id).subscribe((response: {success: number , data: any[]}) => {
      if (response.data){
        this.courseListByStudent = response.data;
        this.feesService.getBillInfo(item.id).subscribe((billResponse: {success: number, data: any}) => {
          if (billResponse.data.length > 0 ){
            this.isPrintReceiptEnabled = true;
          }
        });
      }
    });

  }

  clearForm(){
    // this.feesEntryForm.reset();
    // this.feesEntryForm.patchValue({date: this.feesDate});
    this.feesEntryForm.controls[('fees')].reset();
  }


  submitFeesByStudent(item){
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
              this.feesEntryForm.controls[('fees')].reset();
              this.feesService.viewDueFees(item.student_id, item.course_id);
              this.feesEntryForm.patchValue({date: this.feesDate});
              this.showDue = false;
              this.isPrintReceiptEnabled = true;
            }
          }, (error) => {
            Swal.fire(error.statusText, '', 'error');
          } );
        }
      });
    }
  }
  viewDue(item){
    this.studentId =  item.student_id;
    this.courseId =  item.course_id;
    this.showDiscount = false;
    this.feesService.viewDueFees( this.studentId, this.courseId).subscribe((response: {success: number , data1: any, data2: any}) => {
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
    this.feesService.getBillInfo(this.feesEntryForm.value.id).subscribe();
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      data: { savedBillIfo: this.savedBillIfo , billInfo: this.billInfo },
      width: '80%' , height: '90%',
      panelClass: 'custom-dialog-container'
    };
    this.dialog.open(BillComponent  , dialogConfig);
  }



  setDiscount(){
    this.showDiscount  = true;
  }

  onSubmit(data){
      this.feesService.setDiscount( this.studentId, this.courseId, data).subscribe((response: {success: number , data: any}) => {
        if (response.data){
          Swal.fire('Success', 'Discount has been set', 'success');
          this.feesService.viewDueFees(this.studentId, this.courseId).subscribe((newResponse: {success: number , data1: any, data2: any}) => {
            if (newResponse.data2){
              this.dueByStudent = newResponse.data2;
              console.log(this.dueByStudent[0]);
              this.showDue = true;
            }
            if (newResponse.data1){
              this.feesPaid  = newResponse.data1;
            }
          });
          this.discount = null;
        }
      }, error => {
        Swal.fire('Error', 'Discount has not been set', 'error');
      });
  }


  backToPrevious(){
    this.showDue = false;
  }




}
