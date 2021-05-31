import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../../services/course.service';
import {Course} from '../../models/course.model';
import {FormGroup} from '@angular/forms';
import {CourseType} from '../../models/course-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courseData: Course[];
  courseTypeList: CourseType[];
  courseForm: FormGroup;
  showSave =  true;
  searchCourse: string;
  pageSize = 5;
  p = 1;
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.pageSize = 5;
    this.p = 1;
    this.courseForm =  this.courseService.courseForm;
    this.courseService.getCourseUpdateListener().subscribe((response) => {
      this.courseData = response;
      console.log(this.courseData);
    });
    this.courseService.getCourseTypes().subscribe((response: {success: number , data: CourseType[]}) => {
      this.courseTypeList = response.data;
    });
  }
  saveCourse(){
    this.courseService.saveCourse().subscribe((response: {success: number , data: Course}) => {
        if (response.data){
          // this.courseData.unshift(response.data);
          this.courseForm.reset();
          Swal.fire({
            title: 'Success',
            text: 'Course has been added successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
        }
    }, (error) => {
      Swal.fire({
        title: error.message,
        text: 'Course is not saved',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  populateCouseForm(data){
    this.showSave = false;
    this.courseForm.patchValue({id: data.id ,  course_name: data.course_name , course_fees: data.course_fees , course_type_id: data.course_type_id});
  }
  updateCourse(){
    this.courseService.update().subscribe((response: {success: number , data: Course}) => {
      if (response.data){
        Swal.fire({
          title: 'Updated',
          text: 'Course is updated',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        const index = this.courseData.findIndex(x => x.id === this.courseForm.value.id);
        if (index !== -1){
          this.courseData.splice(index, 1, response.data);
        }
        this.courseForm.reset();
        this.showSave = true;
      }
    }, (error) => {
      Swal.fire({
          title: error.message,
          text: 'Course is not updated ',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
    });
  }
  clearForm(){
    this.courseForm.reset();
    this.showSave = true;
  }
  deleteCourse(data){
    Swal.fire({
      title: 'Are you sure to delete the course?',
      text: 'Please confirm to add',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm ?',
      cancelButtonText: 'Decline'
    }).then((result) => {
      if(result.value){
        this.courseService.delete(data).subscribe((response) => {
          if (response.data){
            // Swal.fire('Success', 'Course Deleted', 'success' );
            Swal.fire({
              title: 'Success',
              text: 'Course has been deleted successfully ',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
          }
        }, (error) => {
          if (error.status === 500){
            Swal.fire({
              title: 'Active Course',
              text: 'Course can not be deleted ',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }
}
