//adapted from http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

import { User } from '../classes/user/user';
import { SessionCookie } from '../classes/session-cookie/session-cookie';
 
 
@Injectable()
export class AuthenticationService {

    private extractData(res: Response) {

        let body = res.json();
        console.log(body);
        return body || { };
    }

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});

    private loginUrl = 'http://localhost:8080/api/login';


    // logs the user in, returns the user object
    login(username: string, password: string): Promise<User> {

        // clear the cached user
        localStorage.removeItem("user");

        // set the headers for POST
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        var user: User = new User(); // create user object

        user.username = username; // set username

        // create new cookie object
        var cookie: SessionCookie = new SessionCookie();
        cookie.AuthToken = ""; // set defualt value

        // post login details to Go server
        return this.http.post(this.loginUrl, JSON.stringify({username: username, password: password}), options)
                .toPromise()
                .then((res: Response) => {

                    cookie = this.extractData(res); // get the cookie
                    user.cookie = cookie; // set the cookie in user object

                    return user; // return the user object to caller
                });

    } // login()
 
    logout() {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
        //destroy cookie
    }
}