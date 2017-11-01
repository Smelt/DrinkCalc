import { User} from '../model/user.model';
import { OnInit } from '@angular/core';
import { Subject} from 'rxjs/Subject';

export class UserService implements OnInit {

    private defaultUser: User;
    private signedUser: User;
    private signedIn = false;
    userSigned = new Subject<User>();
    
    ngOnInit() {
        this.defaultUser = new User("Sally", "Smith", "female", "New York", 80);
    }

    getUser(){
        if(this.signedUser == undefined  || this.signedUser == null){
            console.log("returning default User");
            return this.defaultUser;
        }
        console.log("signed user");
        return this.signedUser;
    }

    createUser(firstName: string, lastName: string, sex: string, state: string, weight: number){
        this.signedUser = new User(firstName,lastName,sex,state,weight);
        this.signedIn = true;
        this.userSigned.next(this.signedUser);
    }

    isSignedIn(){
        return this.signedIn;
    }

    
    
}