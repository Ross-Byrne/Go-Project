import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Thread } from '../classes/thread/thread';
import { User } from '../classes/user/user';
import { THREADS } from '../mock-threads';

@Injectable()
export class ThreadService {

    constructor(private http: Http) { }

    //private saveThreadURL = 'http://localhost:8080/api/saveThread';  // URL to save a thread in go
    //private getThreadURL = 'http://localhost:8080/api/getThreads';  // URL to get a threads from go

    private saveThreadURL = 'http://goproject.ukwest.cloudapp.azure.com:8080/api/saveThread';  // URL to save a thread in go
    private getThreadURL = 'http://goproject.ukwest.cloudapp.azure.com:8080/api/getThreads';  // URL to get a threads from go

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    //extracts data from json response
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    //a promise that returns a list of threads from Go server
    getThreads(): Promise<Thread[]> {

        var user: User;

        user = JSON.parse(localStorage.getItem("user"));

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.getThreadURL, JSON.stringify(user.cookie), options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);

    }//getThreads()

    //save a thread to couchDb Through the go server
    saveThread(thread: Thread) {

        var user: User;

        user = JSON.parse(localStorage.getItem("user"));

         // create object to send data to server including session cookie
        var data = {"Cookie": user.cookie, "thread": thread};

        // sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.saveThreadURL, JSON.stringify(data), options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
    } // saveThread()

}//end thread service