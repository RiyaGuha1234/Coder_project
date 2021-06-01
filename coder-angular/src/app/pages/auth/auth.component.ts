import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Md5} from 'ts-md5';
import {User} from "../../models/user.model";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;
  isAuthenticated =  false;
  isSubmiited = false;
  userData: User;


  constructor(private authService: AuthService ,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.isAuthenticated = false;
    this.isSubmiited = false;
    this.loginForm = this.authService.loginForm;
    this.loginForm.patchValue({user_name: this.cookieService.get('username'), password: this.cookieService.get('password')});


    // console.log('rememberCurrentUser');
    // console.log(localStorage.getItem('rememberCurrentUser'));
    //
    // console.log('userInfoLS');
    // console.log(localStorage.getItem('userInfo'));
    //
    // console.log('userInfoSS');
    // console.log(sessionStorage.getItem('userInfo'));
    // this.userData = this.authService.currentUserValue;
    // console.log('this.userData');
    // console.log(this.userData);
  }
  login(){
    // console.log(this.loginForm.value);
    if(this.loginForm.value.rememberMe === true){

    }
    const md5 = new Md5();
    const passwordMd5 = md5.appendStr(this.loginForm.value.password).end();
    this.isSubmiited = true;
    this.authService.login({userName: this.loginForm.value.user_name , password: passwordMd5, rememberMe: this.loginForm.value.rememberMe}).subscribe((response: {success: number, userData: any , token: any}) => {
      if (response.token === null){
        this.errorMsg = response.userData;
      }
      else{
        this.isAuthenticated = true;
      }
    });
  }

}
