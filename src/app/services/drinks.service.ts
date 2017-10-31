import { Drink } from '../model/drink.model';
import { UserService} from './user.service';
import { User} from '../model/user.model';


export class DrinkService {

  private user: User;
  private drinksArr: Drink[] = [];

  constructor(){
    this.user = new User("Tom", "Smith", "male","MAryland", 185);
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
      if (d.time < e) {
        e = d.time;
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
      sum += d.calories;
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
    console.log("Grams Alcohol " + gramsAlcohol);
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

}