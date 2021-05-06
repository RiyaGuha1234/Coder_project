import { Component, OnInit } from '@angular/core';
import {BillService} from '../../services/bill.service';
import {ToWords} from 'to-words/dist/to-words';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {

  viewBillData: any[];
  showBill =  false;
  totalAmountPaid = 0;
  toWords = new ToWords();

  printDivStyle = {
    printBillDiv: {marginRight : '3px', marginLeft : '3px', marginTop : '5px'},
    table: {width : '100%', border: '1px dashed', textAlign: 'center'},
    // label: {width: '100%'},
    tr: {border: '1px dashed', padding: '5 px'},
    thead: {'border-style': '1px dashed'}
  };

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.totalAmountPaid = 0;
    this.showBill = false;
    this.viewBillData = this.billService.getBillData();
    if (this.viewBillData){
      this.showBill = true;
      for (let i = 0 ; i < this.viewBillData.length ; i++ ){
        this.totalAmountPaid = this.totalAmountPaid + this.viewBillData[i].paid;
      }
    }

    // this.billService.billDetailDataUpdateListener().subscribe((response) => {
    //   console.log(response);
    //   if (response.data){
    //     this.viewBillData = response.data;
    //     console.log(response.data);
    //     this.showBill = true;
    //   }
    // });

  }

  convert(){
    return this.toWords.convert(this.totalAmountPaid);
  }

}
