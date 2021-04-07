import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {User} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorInterceptor implements HttpInterceptor{
  userData: User;

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('AuthInterceptorInterceptor invoked');
    // const clonedRequest = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + '1234') });
    // return next.handle(clonedRequest);
    if (localStorage.getItem('userInfo')){
      this.userData  = JSON.parse(localStorage.getItem('userInfo'));
      console.log(this.userData);
      const clonedRequest = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.userData.auth_token) });
      return next.handle(clonedRequest);
    }
    else {
      this.userData = null;
      const clonedRequest = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + null) });
      return next.handle(clonedRequest);
    }
  }
}
