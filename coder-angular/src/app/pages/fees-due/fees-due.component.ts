import { Component, OnInit } from '@angular/core';
import {FeesDueService} from '../../services/fees-due.service';

@Component({
  selector: 'app-fees-due',
  templateUrl: './fees-due.component.html',
  styleUrls: ['./fees-due.component.scss']
})
export class FeesDueComponent implements OnInit {

  studentFeesList: any[];
  searchString: string;
  pageSize: number;
  page: number;
  p = 1;
  constructor(private feesDueService: FeesDueService) {
    this.studentFeesList = this.feesDueService.getDueFeesList();
  }

  ngOnInit(): void {
    this.pageSize = 6;
    this.feesDueService.getStudentFeesDataUpdateListener().subscribe((response) => {
      this.studentFeesList = response;
    });
  }

}
