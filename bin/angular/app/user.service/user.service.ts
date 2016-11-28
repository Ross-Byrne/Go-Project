// System imports
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { User } from '../classes/user/user';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }

    // local development urls
    private userURL = 'http://localhost:8080/api/createUser';

    // production urls
    // private userURL = 'http://goproject.ukwest.cloudapp.azure.com:8080/api/createUser';

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
 
    // signs the user up, returns if it worked or not
    signup(username: string, password: string): Promise<Boolean> {
        // set the headers for POST
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        //debugging for username and password
        //console.log({username: username, password: password});

        // post login details to Go server
        return this.http.post(this.userURL, JSON.stringify({username: username, password: password}), options)
                .toPromise()
                .then(() => {
                    return true;
                })
                .catch(() => { 
                    return false;
                });

    } // signup()

}//end User.Service