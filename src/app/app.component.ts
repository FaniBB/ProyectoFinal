import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'graficos';
  public barChartData: Array<any> = [
    
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series B' }
  ];

  public barChartLegend = true;

  public barChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

  public barChartOptions:any={
    responsive:true
  }

  public barChartColors: Array<any> =[
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public batChartLegend:boolean = true;
  public barChartType: ChartType = 'bar';

  public randomize(): void{
    let _barChartData:Array<any>=new Array(this.barChartData.length);
    for(let i=0;i<this.barChartData.length;i++){
      _barChartData[i]={data:new Array (this.barChartData[i].data.length),label:this.barChartData[i].label};
      for(let j=0;j<this.barChartData[i].data-length;j++){
        _barChartData[i].data[j]=Math.floor((Math.random()*100)+1);
      }
    }
    this.barChartData=_barChartData;
  }
  //events
  public chartClicked(e:any):void{
    console.log(e);
  }
  public chartHovered(e:any):void{
    console.log(e);
  }
}
