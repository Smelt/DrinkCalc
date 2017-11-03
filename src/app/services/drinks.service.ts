import { Drink } from '../model/drink.model';
import { UserService} from './user.service';
import { User} from '../model/user.model';
import { Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/finally'; 

@Injectable()
export class DrinkService {

  private user: User;
  private drinksArr: Drink[] = [];
  private drinksChart: number[] = [];
  private serverURL = 'https://angular-boozekick.firebaseio.com/';

  constructor(private http: Http ){
    this.user = new User("Tom", "Smith", "male","Maryland", 185);
  }


  deleteDrink(drink: Drink){
    let index = 0;
    for(let i = 0; i < this.drinksArr.length; i++){
      if(drink.time == this.drinksArr[i].time){
        index = i;
        console.log("found at " +  i );

        this.drinksArr.splice(i, 1);
      }
    }
  }

  storeDrinksDB(){
    const headers = new Headers({'Content-Type': 'application/json'})
    return this.http.put(this.serverURL + "data.json" , this.drinksArr, {headers: headers});
  }

  getDrinksDB(){
   return this.http.get(this.serverURL + "data.json")
   .map(
      (response) => {
        const data = response.json();
        return data;
      }
    );
  }

  getChartData(){
    this.drinksChart = new Array();
    for(let i = 0; i < this.drinksArr.length; i++){
      this.drinksChart[i] = this.dataBAC(this.drinksArr.slice(0,i)) * 200;
    }
    return this.drinksChart;
  }

  updateDrinksArr(drinks: Drink[]){
    this.drinksArr = drinks;
  }


  getDrinksArr(){
    return this.drinksArr;
  }

  addDrink(drink: Drink) {
    this.drinksArr.push(drink);
  }

  firstDrinkConsumed() {
    let e = 100;
    for (let d of this.drinksArr) {
      let conT = new Date(d.time);
      let hour: number = conT.getHours();
      if (hour < e) {
        e = hour;
      }
    }
    return e;
  }

  static getCurrHour(){
    const d: Date = new Date();
    return d.getHours();
  }

  calculateCalorieCount(){
    let sum = 0;
    for(let d of this.drinksArr){
      let dCals = Number(d.calories);
      console.log(dCals + " L");
      sum += dCals;
    }
  
    return sum;
  }

  totalAlcoholConsumed(){
    let servings = 0;
    let totalAlcoholConsumed = 0;
    for(let d of this.drinksArr){
       servings += d.serving;
    }
    return servings;
  }

  calculateRawBAC(){   
    let gramsAlcohol = 14 * this.totalAlcoholConsumed();
    let gramsBody = 454 * this.user.weight;
    let rawBAC  = ((gramsAlcohol)/(gramsBody * this.user.sexConstant)) * 100;
    return rawBAC;
  }

  calculateBAC(){   
    let rawBAC  = this.calculateRawBAC();
    let firstDrinkHour = this.firstDrinkConsumed();
    let currHour = DrinkService.getCurrHour();
    let timeElapsed = currHour - firstDrinkHour;
    let BAC = rawBAC - (0.015 * timeElapsed);
    if(rawBAC < 0){
      BAC = 0;
    }
    return BAC;
  }

  dataAlcoholConsumed(drinks: Drink[]){
    let servings = 0;
    let totalAlcoholConsumed = 0;
    for(let d of drinks){
       servings += d.serving;
    }
    return servings;
  }


  dataRawBAC(drinks: Drink[]){   
    let gramsAlcohol = 14 * this.dataAlcoholConsumed(drinks);
    console.log("Grams Alcohol " + gramsAlcohol);
    let gramsBody = 454 * this.user.weight;
    let rawBAC  = ((gramsAlcohol)/(gramsBody * this.user.sexConstant)) * 100;
    return rawBAC;
  }

  dataBAC(drinks: Drink[]){   
    let rawBAC  = this.calculateRawBAC();
    let firstDrinkHour = this.firstDrinkConsumed();
    let currHour = DrinkService.getCurrHour();
    let timeElapsed = currHour - firstDrinkHour;
    let BAC = rawBAC - (0.015 * timeElapsed);
    if(rawBAC < 0){
      BAC = 0;
    }
    return BAC;
  }

}