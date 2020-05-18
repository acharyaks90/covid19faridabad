import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})



export class DashboardService {

  recovered = 0;
  active = 0;
  confirmed = 0;
  deceased = 0;
  lastUpdate = 0;
  fbd_data:any;
    constructor(private httpReq : HttpClient ){
        
    }


    getCovidData(){
        this.httpReq.get('https://api.covid19india.org/districts_daily.json')
        //this.httpReq.get('https://api.covid19india.org/state_district_wise.json')
        .subscribe((res:any)=>{
          
          this.fbd_data = res.districtsDaily.Haryana.Faridabad;
          let length = res.districtsDaily.Haryana.Faridabad.length;
          let last = this.fbd_data[length-1]
          this.active = last.active;
          this.recovered = last.recovered;
          this.confirmed = last.confirmed;
          this.deceased = last.deceased;
          this.lastUpdate = last.date;
        this.fbd_data=   this.fbd_data.reverse() 
        },err=>{
    
        })
      }
}