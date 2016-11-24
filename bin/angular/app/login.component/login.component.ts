//adapted from http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial

// System imports
import { Component, OnInit } from '@angular/core';
import { Router }       from '@angular/router';

import { AuthenticationService } from '../auth.service/authentication.service';


import { SessionCookie } from '../classes/session-cookie/session-cookie';
import { User } from '../classes/user/user';


@Component({
  moduleId: module.id,
  selector: 'login-page',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    title = "Login Page";
    model: any = {};
    loading = false;
    cookie: SessionCookie = new SessionCookie();
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {

        this.loading = true;
        var loggedinuser: User = new User();

        this.authenticationService.login(this.model.username, this.model.password) // log the user in
        .then(user => loggedinuser = user) // set the user object
        .then(() => { // hand the user object

            // check if the cookie is valid
            if(loggedinuser.cookie.AuthToken !== ""){
                
                // stop loading
                this.loading = false;

                // store the user in localStorage
                localStorage.setItem("user", JSON.stringify(loggedinuser))

                //console.log(localStorage.getItem("user"));
                //console.log(loggedinuser);

                // go to home page
                this.router.navigate(['/']);

            } else { // if not valid

                
                // stop loading
                this.loading = false;

                // handled incorrect login details
                console.log("Not logged in!");

            } // if

        }).catch(()=>{ // catch exceptions

            // stop loading
            this.loading = false;

            // handled incorrect login details
            console.log("Not logged in");
        });
    } // login() 
}