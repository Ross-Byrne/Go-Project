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
        this.userService.createUser(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.router.navigate(['/login']);
                },
                error => {
                    console.log("Unable to signup: "+error);
                    this.loading = false;
                });
    }
}