import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  constructor( private  authservice: AuthService) { }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('userInfo')));
  }

  showToasterSuccess(){

    this.authservice.showSuccess('Data shown successfully !!', 'ItSolutionStuff.com');

  }




}
