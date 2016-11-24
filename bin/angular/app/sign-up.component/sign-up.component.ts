//adapted from http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial

// System imports
import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { UserService } from '../user.service/user.service';


@Component({
  moduleId: module.id,
  selector: 'sign-up-page',
  templateUrl: 'sign-up.component.html'
})
 
export class SignUpComponent {
    title = "Sign Up Page";
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: UserService
        ) { }
 
    register() {
        this.loading = true;
        var worked: Boolean = false;

        this.userService.signup(this.model.username, this.model.password) // create a user
        .then(status => worked = status) // get the status
        .then(() => { //handle signup

            // check if the sign was successful
            if(worked === true){
                
                // stop loading
                this.loading = false;


                console.log("User Created!");

                // go to home page
                this.router.navigate(['/login']);

            } else { // error

                // stop loading
                this.loading = false;

                // handle error
                console.log("Error, Username taken!");
            } // if

        }).catch(()=>{ // catch exceptions

            // stop loading
            this.loading = false;

            // handled incorrect login details
            console.log("Error occured! Not signed up!");
        });
    }
}