import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {Student} from '../../models/student.model';
import {FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {Course} from '../../models/course.model';
import {StudentToCourseService} from '../../services/student-to-course.service';
import {formatDate} from '@angular/common';
import {HttpHeaders, HttpResponse} from '@angular/common/http';




@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentList: Student[];
  courseList: Course[];
  studentForm: FormGroup;
  showCourses = false;
  selectedCourse = [];
  studentName: string;
  searchString: string;
  searchCourse: string;
  pageSize: number;
  page: number;
  p = 1;
  showSave = true;
  studentId: number;
  feesForStudent: number;
  studentToCourseList: any;
  minDate = new Date(2020, 4, 9);
  maxDate = new Date(2024, 4, 9);
  currentDate = new Date();
  date = formatDate(this.currentDate , 'dd/MM/yyyy', 'en');

  constructor(private studentService: StudentService , private  studentToCourseService: StudentToCourseService ) {
    this.studentList = this.studentService.getStudents();
  }

  ngOnInit(): void {
    this.searchString = null;
    this.studentForm = this.studentService.studentForm;
    this.showCourses = false;
    this.page = 1;
    this.pageSize = 5;

    this.studentService.studentDataSubUpdateListener().subscribe((response) => {
      this.studentList = response;
    });
    this.studentToCourseService.studentToCourseDataUpdateListener().subscribe((response) => {
      this.studentToCourseList = response;
    });
  }

  saveStudent(){
    Swal.fire({
      title: 'Are you sure to add the student?',
      text: 'Please confirm to add',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm ?',
      cancelButtonText: 'Decline'
    }).then((result) => {
      if (result.value){
        this.studentForm.value.date = formatDate(this.studentForm.value.date , 'yyyy-MM-dd' , 'en');
        this.studentService.saveStudentData().subscribe((response: { success: number, data: Student }) => {
          if (response.success === 1){
            Swal.fire('Student has been added', '', 'success');
            this.studentForm.reset();
            this.studentForm.patchValue({contact: '+91'});
          }
        });
      }
      else {
        Swal.fire(
          'Cancelled',
          'student is not added',
          'error'
        );
      }

    });
  }

  clearForm(){
    this.studentForm.reset();
    this.studentForm.patchValue({contact: '+91', date: this.date});

  }

  populateFormByStudent(item){
    this.showCourses = false;
    this.showSave = false;
    this.studentForm.patchValue({id: item.id, student_name: item.student_name, contact: item.contact, address: item.address});

  }
  updateStudentInfo(){
    Swal.fire({
      title: 'Are you sure to update the student?',
      text: 'Please confirm to add',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm ?',
      cancelButtonText: 'Decline'
    }).then((result) => {
      if(result.value){
        if (this.studentForm.value.effective_date){
          this.studentForm.value.effective_date = formatDate( this.studentForm.value.effective_date , 'yyyy-MM-dd', 'en');
          console.log( this.studentForm.value.effective_date);
        }
        this.studentService.updateStudent().subscribe((response: {success: number, data: Student}) => {
          if (response.success === 1 ){
            Swal.fire('Student Data Updated', 'success', 'success');
            this.studentForm.reset();
            this.studentForm.patchValue({contact: '+91'});
          }
        }, (error) => {
          Swal.fire(error.message,
            'Student data is not updated',
            'error');
        } );
      }
    });

  }
  deleteStudent(item){
    Swal.fire({
      title: 'Are you sure to delete the student ?',
      text: 'please confirm to add',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm ?',
      cancelButtonText: 'Decline'
    }).then((result) => {
      if (result.value){
        //--------method for getting status code in response from component----------

        // this.studentService.deleteStudent(item.id).subscribe((response) => {
        //   console.log('from compo');
        //   console.log(response);
        // }, error => {
        //   console.log(error);
        // });

        this.studentService.deleteStudent(item.id).subscribe((response: {success: number, data: any}) => {
          if (response.success === 1){
            Swal.fire('Student Data Deleted', 'success', 'success');
          }
        }, (error) => {
          if (error.status === 500){
            Swal.fire(error.statusText,
              'Student data is active',
              'error');
          }
        });
      }
      else{
        Swal.fire( 'Cancelled',
          'Student is not Deleted',
          'error');
      }
    });
  }

  backToPrevious(){
      this.showCourses = false;
  }


  addCourseToStudent(item){
    this.studentToCourseService.getCourses().subscribe((response: {success: number, data: Course[]}) =>
    {
      if (response.data){
        this.courseList = response.data;
        this.showCourses = true;
      }
    });
    this.studentToCourseService.getCourseByStudent(item.id).subscribe((response: {success: number, data: any}) => {
      if(response.data){
         for (let i = 0; i < response.data.length; i++){
           const index = this.courseList.findIndex(x => x.id === response.data[i].course_id);
           if(index !== -1 ){
             this.courseList[index].isCourseSaved = true;
           }
         }
      }
    });
    this.selectedCourse = [] ;
    this.studentName = item.student_name;
    this.studentId = item.id;
  }
  addCourse(item){
    item.isCourseSet = true;
    this.selectedCourse.push(item.id, this.feesForStudent);
    console.log(this.selectedCourse);
  }
  removeCourse(item){
    item.isCourseSet = false;
    // const index = this.selectedCourse.findIndex(x => x.id === item.id );
    // this.selectedCourse.splice(index,1);
  }
  submitCourse(item){
    Swal.fire({
      title: 'Are you sure to add the course?',
      text: 'please confirm to add',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm ?',
      cancelButtonText: 'Decline'
    }).then((result) => {
      if (result.value){
        this.studentToCourseService.addCourse(item, this.studentId).subscribe((response: {success: number , data: any}) => {
          if (response.success === 1 ){
            Swal.fire( 'Done',
              'Course Added',
              'success');
            item.isCourseSaved = true;
            item.isCourseSet = false;
          }
        }, (error) => {
          if (error.status === 500) {
            Swal.fire('Duplicate Entry',
              'Course is already added');
          }
        });
      }
      else{
        Swal.fire( 'Cancelled',
          'Course is not Added',
          'error');
      }
    });
  }


}
