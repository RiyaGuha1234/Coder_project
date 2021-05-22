import { Component, OnInit} from '@angular/core';
import {BillService} from '../../services/bill.service';
import {ToWords} from 'to-words/dist/to-words';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




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

  // downloadBill() {
  //   const header = [['SL NO', 'COURSE', 'COURSE TYPE', 'AMT PAID', 'BALANCE DUE']];
  //   const billData = this.viewBillData.map(({ course_id , course_name, type, paid , due}) => ({ course_id , course_name, type, paid , due }));
  //   const doc = new jsPDF();
  //   console.log(this.viewBillData);
  //
  //   doc.setFontSize(18);
  //   // doc.text('CODER', 11, 8);
  //   // doc.text('CODER', 11, 8);
  //   doc.text(  this.viewBillData[0].bill_number, 11, 8);
  //   doc.setFontSize(11);
  //   doc.setTextColor(100);
  //
  //   (doc as any).autoTable({
  //     head1: this.viewBillData[0].bill_number,
  //     // head: [['SL NO', 'COURSE', 'COURSE TYPE', 'AMT PAID', 'BALANCE DUE']],
  //     body: billData ,
  //     theme: 'striped',
  //     didDrawCell: data => {
  //     }
  //   });
  //
  //
  //   // below line for Open PDF document in new tab
  //   doc.output('dataurlnewwindow');
  //
  //   // below line for Download PDF document
  //   doc.save('myteamdetail.pdf');
  // }

  downloadBill(){
    const data = document.getElementById('printBillDiv');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
      const imgWidth = 208 ;
      const pageHeight = 1200 ;
      const imgHeight = canvas.height * imgWidth / canvas.width ;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('bill.pdf'); // Generated PDF
    });
  }
}
