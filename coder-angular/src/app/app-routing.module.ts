import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {StudentComponent} from './pages/student/student.component';
import {AuthComponent} from './pages/auth/auth.component';
import {OwnerComponent} from './pages/owner/owner.component';
import {FeesComponent} from './pages/fees/fees.component';
import {FeesDueComponent} from './pages/fees-due/fees-due.component';
import {StudentToCourseComponent} from './pages/student-to-course/student-to-course.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'student', component: StudentComponent},
  {path: 'login', component: AuthComponent},
  {path: 'owner', component: OwnerComponent},
  {path: 'fees', component: FeesComponent},
  {path: 'feesDue', component: FeesDueComponent},
  {path: 'studentToCourse', component: StudentToCourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
