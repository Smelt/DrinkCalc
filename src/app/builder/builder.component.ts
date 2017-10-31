import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { User} from '../model/user.model'
import {Drink} from '../model/drink.model';
import {UserService } from '../services/user.service';
import {DrinkService } from '../services/drinks.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  drinksArr: Drink[] = new Array();  
  user: User;
  alcoholConsumed: number = 0;
  rawBAC: number = 0;
  actualBAC: number = 0;
  drinkTime: number;
  drinkType: string = "Beer";
  drinkContent: number = 1;
  calorieCount = 0;

  constructor(private userService: UserService, private drinkService: DrinkService) {
    this.drinkTime = BuilderComponent.getCurrHour();
    this.drinksArr = drinkService.drinksArr;
   }

  ngOnInit() {
    this.user = new User("Tom", "Smith", "male", 185);
  }

  onAddDrink(){
    const type = this.drinkType;
    const content = this.drinkContent;
    const time = this.drinkTime;
    this.drinkService.addDrink(new Drink(type,time,content));
    this.calculateBAC();
    this.onResetDrink()
   
  }

  onResetDrink(){
    this.drinkContent = 1;
    this.drinkTime = 12;
    this.drinkType = "Beer";
  }

  
  static getCurrHour(){
    const d: Date = new Date();
    return d.getHours();
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
    let firstDrinkHour = this.drinkService.firstDrinkConsumed();
    let currHour = BuilderComponent.getCurrHour();
    let timeElapsed = currHour - firstDrinkHour;
  }
}



