import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() deviceXs: boolean;
  userData: User;
  isAuthenticated: boolean;


  constructor(private  authService: AuthService ) {
    this.userData = JSON.parse(localStorage.getItem('userInfo'));
    if (this.userData){
      this.isAuthenticated = true;
    }
    else{
      this.isAuthenticated = false;
    }
  }

  ngOnInit(): void {
    this.authService.userSub.subscribe((response) => {
      if (response){
        this.userData = response;
        this.isAuthenticated = true;
        console.log(this.isAuthenticated);
      }
      else{
        this.isAuthenticated = false;
        console.log(this.isAuthenticated);
      }
    });

  }
  logOut(){
    this.authService.logOut();
  }




}
