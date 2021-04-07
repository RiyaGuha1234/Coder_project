import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.authService.loginForm;

  }
  login(){
    const md5 = new Md5();
    const passwordMd5 = md5.appendStr(this.loginForm.value.password).end();

    this.authService.login({userName: this.loginForm.value.user_name , password: passwordMd5}).subscribe((response: {success: number, userData: any , token: any}) => {
      if (response.token === null){
        this.errorMsg = response.userData;
      }
    });
  }

}
