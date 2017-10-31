import { Component, OnInit } from '@angular/core';
import { User} from './model/user.model';
import { UserService} from './services/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User

  constructor(public userService: UserService){
    this.user = userService.getUser();
    console.log("app constructor");
  }

  ngOnInit() {
    this.userService.userSigned.subscribe((value) => {
      console.log(value); 
      this.user = value;
    });


}
  
 

}
