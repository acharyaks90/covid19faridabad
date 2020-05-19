import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/dashboard/dashboard.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(public dashBoardService : DashboardService) { }

  ngOnInit() {
    if(this.dashBoardService.fbd_data.length==0){
      this.dashBoardService.getCovidData();
    }
  }

}
