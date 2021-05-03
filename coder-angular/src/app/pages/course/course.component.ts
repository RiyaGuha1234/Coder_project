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
          this.courseData.unshift(response.data);
          this.courseForm.reset();
          Swal.fire('Success', 'Course Added', 'success');
        }
    }, (error) => {
      Swal.fire(error.message, 'Course not saved', 'error');
    });
  }

  populateCouseForm(data){
    this.showSave = false;
    this.courseForm.patchValue({id: data.id ,  course_name: data.course_name , course_fees: data.course_fees , course_type_id: data.course_type_id});
  }
  updateCourse(){
    this.courseService.update().subscribe((response: {success: number , data: Course}) => {
      if (response.data){
        Swal.fire('Updated', 'Course Data Uodated', 'success');
        const index = this.courseData.findIndex(x => x.id === this.courseForm.value.id);
        if (index !== -1){
          this.courseData.splice(index, 1, response.data);
        }
      }
    }, (error) => {
      Swal.fire(error.message, 'Course not Saved', 'error');
    });
  }
  clearForm(){
    this.courseForm.reset();
  }
  deleteCourse(data){
    this.courseService.delete(data).subscribe((response) => {
      if (response.data){
        Swal.fire('Success', 'Course Deleted', 'success');
        const index = this.courseData.findIndex(x => x.id === data);
        this.courseData.splice(index, 1);
      }
    }, (error) => {
      if (error.status === 500){
        Swal.fire('Active Course' , 'Course cannot be deleted', 'error');
      }
    });
  }
}
