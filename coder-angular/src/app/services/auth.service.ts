import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {User} from '../models/user.model';
import {Subject, Observable,BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {GlobalVariable} from '../shared/GlobalVariable';
import { ToastrService } from 'ngx-toastr';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginForm: FormGroup;
  userSub = new Subject<User>();
  errorMsg: string;
  isRememberMe: boolean;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      user_name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      rememberMe: new FormControl(false),
    });


    // this.isRememberMe =  localStorage.getItem('rememberCurrentUser') === 'true' ? true : false;
    // if (localStorage.getItem('rememberCurrentUser') === 'true'){
    //   this.currentUserSubject = new BehaviorSubject<User>(
    //     JSON.parse(localStorage.getItem('currentUser'))
    //   );
    // } else {
    //   this.currentUserSubject = new BehaviorSubject<User>(
    //     JSON.parse(sessionStorage.getItem('currentUser'))
    //   );
    // }

    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue(): User {
  //   console.log(this.currentUserSubject.value);
  //   return this.currentUserSubject.value;
  // }

  login(loginData) {
    // return this.http.post('http://127.0.0.1:8000/api/login', loginData)
    this.isRememberMe =  this.loginForm.value.rememberMe;
    console.log('this.isRememberMe');
    console.log(this.isRememberMe);
    console.log(this.loginForm.value);
    return this.http.post(GlobalVariable.API_URL + 'login', loginData)
      .pipe(tap((response: { success: number, userData: any , token: any }) => {
        if (response.token !== null){
          const user = new User(
            response.userData.id,
            response.userData.user_name,
            response.token
          );
          if(this.isRememberMe){
            console.log(' from if this.isRememberMe');
            console.log(this.isRememberMe);
            this.resetCredentials();
            this.cookieService.set('username', this.loginForm.value.user_name);
            this.cookieService.set('password', this.loginForm.value.password);

            // localStorage.setItem('rememberCurrentUser', 'true');
            // localStorage.setItem('userInfo', JSON.stringify(user));
          }
          else{
            this.resetCredentials();
          }
          // localStorage.setItem('userInfo', JSON.stringify(user));
          this.userSub.next(user);
          this.router.navigate(['/owner']);
        }
        else{
          this.errorMsg = response.userData;
        }
      }));
  }
  logOut(){
    // localStorage.removeItem('userInfo');
    // this.userSub.next(null);
    // this.resetCredentials();
    this.userSub.next(null);
    this.router.navigate(['/']);
  }

  showSuccess(message, title){

    this.toastr.success(message, title);

  }

  resetCredentials(){
    // clear all
    this.cookieService.delete('username');
    this.cookieService.delete('password');
    this.userSub.next(null);
  }

}
