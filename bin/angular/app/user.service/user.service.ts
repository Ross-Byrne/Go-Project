import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';

import 'rxjs/add/operator/toPromise';
 
import { User } from '../classes/user/user';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }

    private userURL = 'http://localhost:8080/api/createUser';

    private extractData(res: Response) {

        let body = res.json();
        console.log(body);
        return body || { };
    }
 
    /*getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }*/
 
    // signs the user up, returns if it worked or not
    signup(username: string, password: string): Promise<Boolean> {

        // set the headers for POST
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log({username: username, password: password});

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
 
    
 
    // private helper methods
 
    private jwt() {
        //can be cookie

        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}