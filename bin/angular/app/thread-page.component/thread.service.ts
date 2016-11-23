import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Thread } from '../classes/thread/thread';
import { THREADS } from '../mock-threads';

@Injectable()
export class ThreadService {

    constructor(private http: Http) { }

    private saveThreadURL = 'http://localhost:8080/api/saveThread';  // URL to web api
    private getThreadURL = 'http://localhost:8080/api/getThreads';

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
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

    private extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body || { };
}

    getThreads(): Promise<Thread[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.getThreadURL, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);

    }

    saveThreadTest(thread: Thread){
        //create Thread
        // console.log(thread.title);
        // console.log(thread.author);
        // console.log(thread.body);
        // console.log(thread.tags);
        // console.log(thread.id);
    }

    saveThread(thread: Thread) {
        // sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.saveThreadURL, JSON.stringify(thread), options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);

        //add if extractData fine

        //return this.getThreads();


    } // saveThread()

}