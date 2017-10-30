import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { User} from '../model/user.model'
import {Drink} from '../model/drink.model';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  drinksArr: Drink[] = new Array();  s;
  user: User;
  alcoholConsumed: number = 0;
  rawBAC: number = 0;
  actualBAC: number = 0;
  drinkTime: number;
  drinkType: string = "Beer";
  drinkContent: number = 1;
  calorieCount = 0;

  constructor() {
    this.drinkTime = BuilderComponent.getCurrHour();
   }

  ngOnInit() {
    this.user = new User("Tom", "Smith", "male", 185);
  }

  onAddDrink(){
    const type = this.drinkType;
    const content = this.drinkContent;
    const time = this.drinkTime;
    this.drinksArr.push(new Drink(type,time,content));
    this.calculateBAC();
    this.onResetDrink()
   
  }

  onResetDrink(){
    this.drinkContent = 1;
    this.drinkTime = 12;
    this.drinkType = "Beer";
  }

   getBlue(){
    return "green";
  }
  
  static getCurrHour(){
    const d: Date = new Date();
    return d.getHours();
  }

  firstDrinkConsumed(){
    let e = 100;
    for(let d of this.drinksArr){
      if(d.time < e ){
        e = d.time;
      }
    }
    return e;
  }
  
  calculateBAC(){
    let totalDrinksConsumed = 0;
    this.calorieCount = 0;
    for(let d of this.drinksArr){
      totalDrinksConsumed += d.size;
      this.calorieCount += d.calories;
    }
    this.alcoholConsumed = totalDrinksConsumed;
    let gramsAlcohol = 14 * totalDrinksConsumed;
    let gramsBody = 454 * this.user.weight;
    let rawBAC  = ((gramsAlcohol)/(gramsBody * this.user.sexConstant)) * 100;
    this.rawBAC = rawBAC;
    let firstDrinkHour = this.firstDrinkConsumed();
    let currHour = BuilderComponent.getCurrHour();
    let timeElapsed = currHour - firstDrinkHour;
  }
}



