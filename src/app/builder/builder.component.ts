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
export class BuilderComponent implements OnInit  {

  drinksArr: Drink[] = new Array();
  user: User;
  alcoholConsumed: number = 0;
  rawBAC: number = 0;
  actualBAC: number = 0;
  drinkTime: Date;
  drinkType: string = "Beer";
  drinkContent: number = 1;
  calorieCount = 0;


  constructor(private userService: UserService, private drinkService: DrinkService) {
    this.drinkTime = new Date();
    this.drinksArr = drinkService.getDrinksArr();
    this.user = this.userService.getUser();
   }

  ngOnInit() {
  }

  onAddDrink(){

    const type = this.drinkType;
    const content = this.drinkContent;
    const time = new Date();

    console.log("Ad");
    this.drinkService.addDrink(new Drink(type,time,content));
    this.calorieCount = this.drinkService.calculateCalorieCount();
    this.alcoholConsumed = this.drinkService.totalAlcoholConsumed();
    this.actualBAC = this.drinkService.calculateBAC();
    this.rawBAC = this.drinkService.calculateRawBAC();
    this.onResetDrink();
    console.log(this.user.firstName); 
  }

  onResetDrink(){
    this.drinkContent = 1;
    this.drinkTime = new Date();
    this.drinkType = "Beer";
  }

  deleteDrink(drink: Drink){
    this.drinkService.deleteDrink(drink);
  }

  getSession(){

    this.drinkService.getDrinksDB()
      .finally(() => {this.actualBAC = this.drinkService.calculateBAC();
      this.calorieCount = this.drinkService.calculateCalorieCount();
      console.log("FINALLY CALLEd");
      }
    )
      .subscribe(
        (drinks: any[]) => {
          this.drinksArr = drinks;
          this.drinkService.updateDrinksArr(this.drinksArr);

        },
        (error) => console.log(error)
      )



  }


  storeDrinks(){
    this.drinkService.storeDrinksDB()
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
\
}



