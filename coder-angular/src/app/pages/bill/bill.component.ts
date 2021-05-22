import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FeesService} from '../../services/fees.service';
import {ToWords} from 'to-words/dist/to-words';
import {BillService} from '../../services/bill.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';



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
  showBill = false;
  toWords = new ToWords();


  constructor(private  route: ActivatedRoute, private  feesService: FeesService, private billService: BillService) {}


  printDivStyle = {
    printBillDiv: {marginRight : '3px', marginLeft : '3px', marginTop : '5px'},
    table: {width : '100%', border: '1px dashed', textAlign: 'center'},
    // label: {width: '100%'},
    tr: {border: '1px dashed', padding: '5 px'},
    thead: {'border-style': '1px dashed'}
  };

  ngOnInit(): void {
    this.showBill = false;
    this.totalAmountPaid  = 0;
    this.feesService.billdataSubUpdateListener().subscribe((response) => {
      if (response){
        this.billInfo = response;
        for (let i = 0; i < this.billInfo.length ; i++){
          this.totalAmountPaid = this.totalAmountPaid + this.billInfo[i].fees_paid;
        }
        this.feesService.generateBill(this.billInfo).subscribe((billResponse: {success: number , data: any}) => {
          if (billResponse.data){
            this.showBill = true;
            this.savedBillIfo  = billResponse.data;
            this.billService.getUpdatedBilledStudentData();
            console.log(billResponse.data);
          }

        });
      }

      });
  }
  convert(){
    return this.toWords.convert( this.totalAmountPaid) ;
  }
  printBill() {
    alert('hi');

  }
  close(){
    alert();
  }
  downloadBill(){
    const data = document.getElementById('printBillDiv');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 300;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('bill.pdf'); // Generated PDF
    });
  }
}
