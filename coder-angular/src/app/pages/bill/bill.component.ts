import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FeesService} from '../../services/fees.service';
import {ToWords} from 'to-words/dist/to-words';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  studentId: number;
  billInfo: any[];
  savedBillIfo: any[];
  totalAmountPaid: number;
  toWords = new ToWords();

  constructor(private  route: ActivatedRoute, private  feesService: FeesService) {}


  printDivStyle = {
    printBillDiv: {marginRight : '3px', marginLeft : '3px', marginTop : '5px'},
    table: {width : '100%'},
    // label: {width: '100%'},
    tr: {'border-style': 'dashed'}
  };

  ngOnInit(): void {

    this.totalAmountPaid  = 0;
    this.feesService.billdataSubUpdateListener().subscribe((response) => {
      if (response){
        this.billInfo = response;
        for (let i = 0; i < this.billInfo.length ; i++){
          this.totalAmountPaid = this.totalAmountPaid + this.billInfo[i].fees_paid;
        }
        this.feesService.generateBill(this.billInfo).subscribe((billResponse: {success: number , data: any}) => {
          this.savedBillIfo  = billResponse.data;
        });
      }

      });
    console.log(this.totalAmountPaid);
  }
  convert(){
    return this.toWords.convert( this.totalAmountPaid) ;
  }
  printBill() {
    alert('hi');

  }


}
