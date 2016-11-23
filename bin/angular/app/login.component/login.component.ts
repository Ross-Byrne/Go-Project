//adapted from http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial

// System imports
import { Component, OnInit } from '@angular/core';
import { Router }       from '@angular/router';

import { AuthenticationService } from '../auth.service/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'login-page',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    title = "Login Page";
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    //on sucessful log in nav to following
                    this.router.navigate(['/']);
                },
                error => {
                  //log or display error
                    console.log("Unable to login: "+error);
                    this.loading = false;
                });
    }
}