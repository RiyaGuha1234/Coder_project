import { Component, OnInit } from '@angular/core';
import {BillService} from '../../services/bill.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {BillComponent} from "../bill/bill.component";
import {ViewBillComponent} from '../view-bill/view-bill.component';
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {

  billedStudentList: any[];
  billDetailsList: any[];
  viewDetails = false;
  viewBillData: any;
  searchDate: any;
  billPageSize = 5;
  billPage = 1;


  constructor(private billService: BillService , public  dialog: MatDialog) {
    this.billedStudentList =  this.billService.getBilledStudentData();
  }

  ngOnInit(): void {
    this.billPage = 1;
    this.billPageSize = 5;
    this.viewDetails = false;
    this.billService.getBilledStudentUpdateListener().subscribe((response) => {
      this.billedStudentList = response;
    });
  }
  viewBillDetails(data){
    this.billService.getBillDetailsByStudent(data).subscribe((response: {success: number , data: any}) => {
      if(response.data){
        this.viewDetails  = true;
        this.billDetailsList = response.data;
        if(this.billDetailsList){
          for(let i = 0; i < this.billDetailsList.length ; i++){
            this.billDetailsList[i].bill_date = formatDate(this.billDetailsList[i].bill_date , 'dd-MM-yyyy', 'en');
          }
        }
      }
    });
  }
  viewBill(data){
     this.billService.getBill(data).subscribe((response: {success: number , data: any}) => {
       if (response.data){
         let dialogConfig = new MatDialogConfig();
         dialogConfig = {
           data: { viewBillData: this.viewBillData},
           width: '80%' , height: '90%',
           panelClass: 'custom-dialog-container'
         };
         this.dialog.open(ViewBillComponent  , dialogConfig);
       }
     });
  }
}
