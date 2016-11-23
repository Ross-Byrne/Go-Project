import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../classes/user/user';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }

    private userURL = 'http://localhost:8080//api/users';

 
    /*getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }*/
 
    createUser(user: User) {
        //create a new user
        return this.http.post(this.userURL, user, this.jwt())
        .map((response: Response) => response.json());
    }
 
    /*delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }*/
 
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