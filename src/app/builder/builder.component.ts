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

  drinksArr: Drink[];
  emptyDrink: Drink;
  user: User;
  alcoholConsumed: number = 0;
  rawBAC: number = 0;
  actualBAC: number = 0;

  constructor() { }

  ngOnInit() {
    this.drinksArr = new Array();
    this.emptyDrink = new Drink("Wine",12,1.0);
    this.user = new User("Tom", "Smith", "male", 185);
  }

  onAddDrink(){
    this.drinksArr.push(this.emptyDrink);
    this.emptyDrink = new Drink("Wine",12,1.0);
    this.calculateBAC();
  }

  onResetDrink(){
    this.emptyDrink = new Drink("Wine",12,1.0);
  }

   getBlue(){
    return "green";
  }
  
  static getCurrHour(){
    const d: Date = new Date();
    d.getHours();
    return 3;
  }
  
  calculateBAC(){
    let totalDrinksConsumed = 0;
    for(let d of this.drinksArr){
      totalDrinksConsumed += d.size;
    }
    this.alcoholConsumed = totalDrinksConsumed;
    let gramsAlcohol = 14 * totalDrinksConsumed;
    let gramsBody = 454 * this.user.weight;
    let rawBAC  = ((gramsAlcohol)/(gramsBody * this.user.sexConstant)) * 100;
    this.rawBAC = rawBAC;
   
    let currHour = BuilderComponent.getCurrHour();
  }
}



