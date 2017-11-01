import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("form Subitted");
  }

  onCreateAccount(form: NgForm){
    let value = form.value;
    this.userService.createUser(value.firstName, value.lastName, value.sex, value.state, value.weight);
    let closeButton = document.getElementById('closeModal');
    console.log(value.firstName + " " + value.lastName);
    closeButton.click();
  }

}
