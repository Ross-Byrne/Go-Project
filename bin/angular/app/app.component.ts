
import { Component, OnInit } from '@angular/core';
import { Router }       from '@angular/router';

import { AuthenticationService } from './auth.service/authentication.service';
import { SessionCookie } from './classes/session-cookie/session-cookie';
import { User } from './classes/user/user';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    }

    logout(){

      // log the user out
      this.authenticationService.logout();

      // go to the login page
      this.router.navigate(['/login']);
    }


}