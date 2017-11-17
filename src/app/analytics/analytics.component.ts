import { Component, OnInit } from '@angular/core';
import { User} from '../model/user.model'
import {Drink} from '../model/drink.model';
import {UserService } from '../services/user.service';
import {DrinkService } from '../services/drinks.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  drinksArr: Drink[] = new Array();
  drinksData: number[] = new Array();

  constructor(private userService: UserService, private drinkService: DrinkService) {
      this.drinksArr = drinkService.getDrinksArr();
      this.drinksData = drinkService.getChartData();
   }

    ngOnInit() {
    }

  public lineChartData:Array<any> = [
    {data: this.drinkService.getChartData(), label: 'BAC%'}
  ];
  public lineChartLabels:Array<any> = this.drinkService.getXData();
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: '#ffe54c',
      borderColor: '#ffb300',
      pointBackgroundColor: '#ffb300',
      pointBorderColor: '#c68400',
      pointHoverBackgroundColor: '#ffb300',
      pointHoverBorderColor: '#c68400'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    this.drinksData = this.drinkService.getChartData();
    console.log(this.drinksData);
    console.log("D + " + this.drinksData);
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



}
