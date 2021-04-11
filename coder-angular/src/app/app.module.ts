import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MaterialModule} from './core/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPrintModule} from 'ngx-print';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { HomeComponent } from './pages/home/home.component';
import { StudentComponent } from './pages/student/student.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { AuthComponent } from './pages/auth/auth.component';
import {AuthInterceptorInterceptor} from './services/auth-interceptor.interceptor';
import { OwnerComponent } from './pages/owner/owner.component';
import { FeesComponent } from './pages/fees/fees.component';
import { FeesDueComponent } from './pages/fees-due/fees-due.component';
import { StudentToCourseComponent } from './pages/student-to-course/student-to-course.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StudentComponent,
    AuthComponent,
    OwnerComponent,
    FeesComponent,
    FeesDueComponent,
    StudentToCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
    NgxPrintModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatIconModule,


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
