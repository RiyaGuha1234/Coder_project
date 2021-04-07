import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student.service';
import {Student} from '../../models/student.model';
import {Course} from '../../models/course.model';
import Swal from 'sweetalert2';
import {StudentToCourseService} from '../../services/student-to-course.service';

@Component({
  selector: 'app-student-to-course',
  templateUrl: './student-to-course.component.html',
  styleUrls: ['./student-to-course.component.scss']
})
export class StudentToCourseComponent implements OnInit {
  studentList: Student[];
  courseList: Course[];
  selectedCourse = [];
  studentName: string;
  showCourses = false;
  studentId: number;

  constructor(private studentService: StudentService , private  studentToCourseService: StudentToCourseService) { }

  ngOnInit(): void {
    this.studentService.studentDataSubUpdateListener().subscribe((response) => {
      this.studentList = response;
    });
    this.studentToCourseService.getCourses().subscribe((response: {success: number, data: Course[]}) =>
    {
      if (response.data){
        this.courseList = response.data;
      }
    });
  }
  addCourseToStudent(item){
    this.selectedCourse = [] ;
    this.studentName = item.student_name;
    this.studentId = item.id;
    this.showCourses = true;
  }
  addCourse(item){
    item.isCourseSet = true;
    this.selectedCourse.push(item.id);
  }
  removeCourse(item){
    item.isCourseSet = false;
    const index = this.selectedCourse.findIndex(x => x.id === item.id );
    this.selectedCourse.splice(index,1);
  }
  SubmitCourse(){
    Swal.fire({
      title: 'Are you sure to add the course?',
      text: 'please confirm to add',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm ?',
      cancelButtonText: 'Decline'
    }).then((result) => {
      if (result.value){
        this.studentToCourseService.addCourse(this.selectedCourse, this.studentId).subscribe((response: {success: number , data: any}) => {
          if (response.success === 1 ){
            Swal.fire( 'Done',
              'Course Added',
              'success');
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
