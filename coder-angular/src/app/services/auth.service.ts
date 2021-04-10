import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {User} from '../models/user.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {GlobalVariable} from '../shared/GlobalVariable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginForm: FormGroup;
  userSub = new Subject<User>();
  errorMsg: string;

  constructor(private http: HttpClient, private router: Router) {
    this.loginForm = new FormGroup({
      user_name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login(loginData) {
    // return this.http.post('http://127.0.0.1:8000/api/login', loginData)
    return this.http.post(GlobalVariable.API_URL + 'login', loginData)
      .pipe(tap((response: { success: number, userData: any , token: any }) => {
        if (response.token !== null){
          const user = new User(
            response.userData.id,
            response.userData.user_name,
            response.token
          );
          localStorage.setItem('userInfo', JSON.stringify(user));
          this.userSub.next(user);
          this.router.navigate(['/owner']);
        }
        else{
          this.errorMsg = response.userData;
        }
      }));
  }
  logOut(){
    localStorage.removeItem('userInfo');
    this.userSub.next(null);
    this.router.navigate(['/']);



  }

}
