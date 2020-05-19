import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  recovered = 0;
  active = 0;
  confirmed = 0;
  deceased = 0;
  lastUpdate = 0;
  recentData = [];
  cSubs: Subscription;

  constructor( public dashBoardService : DashboardService  ) { }

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;
      

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  // startAnimationForBarChart(chart){
  //     let seq2: any, delays2: any, durations2: any;

  //     seq2 = 0;
  //     delays2 = 80;
  //     durations2 = 500;
  //     chart.on('draw', function(data) {
  //       if(data.type === 'bar'){
  //           seq2++;
  //           data.element.animate({
  //             opacity: {
  //               begin: seq2 * delays2,
  //               dur: durations2,
  //               from: 0,
  //               to: 1,
  //               easing: 'ease'
  //             }
  //           });
  //       }
  //     });

  //     seq2 = 0;
  // };
  ngOnInit() {
      /* ----------==========     Recent Corona Chart initialization For Documentation    ==========---------- */

  





      // /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      // var datawebsiteViewsChart = {
      //   labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      //   series: [
      //     [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      //   ]
      // };
      // var optionswebsiteViewsChart = {
      //     axisX: {
      //         showGrid: false
      //     },
      //     low: 0,
      //     high: 1000,
      //     chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      // };
      // var responsiveOptions: any[] = [
      //   ['screen and (max-width: 640px)', {
      //     seriesBarDistance: 5,
      //     axisX: {
      //       labelInterpolationFnc: function (value) {
      //         return value[0];
      //       }
      //     }
      //   }]
      // ];
      // var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      // //start animation for the Emails Subscription Chart
      // this.startAnimationForBarChart(websiteViewsChart);

      this.dashBoardService.getCovidData();
    this.cSubs =  this.dashBoardService.coronaData.subscribe(res=>{
      if(res.length>0){
        this.DrawActiveChart(res)
      }
    })
  }


  DrawActiveChart(data){
    let _data = data.slice(0,7);
    _data = _data.reverse();
    let _labels = [];
    let _series = [];
    _data.map(res=>{
      _labels.push(res.date);
      _series.push(res.active)
    }) 
    const dataRecentCoronaChart: any = {
      labels: [..._labels],
      series: [
          [..._series]
      ]
  };
  let min = Math.min(..._series);
  let max = Math.max(..._series)+5;
 const optionsRecentCoronaChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: min,
      high: max, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  }

  var recentCoronaChartChart = new Chartist.Line('#recentCoronaChart', dataRecentCoronaChart, optionsRecentCoronaChart);

  this.startAnimationForLineChart(recentCoronaChartChart);
  }

  ngOnDestroy(){
    this.cSubs.unsubscribe();
  }

}
