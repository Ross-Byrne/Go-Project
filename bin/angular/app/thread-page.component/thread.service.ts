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

    // uses a Promise to return threads asynchronously onces they are ready
    getThreads(): Promise<Thread[]> {

        return Promise.resolve(THREADS);
    }

    getThreadsFromCouch(thread :Thread): Promise<Thread[]> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.getThreadURL, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);

        //return Promise.resolve(THREADS);
    }


    /*getThread(id: number): Promise<Thread> {
        
        return this.getThreads()
                    .then(threads => threads.find(thread => thread.id === id));
    }*/

    saveThreadTest(thread: Thread){
        //create Thread
        console.log(thread.title);
        console.log(thread.author);
        console.log(thread.body);
        console.log(thread.tags);
        console.log(thread.id);
    }

    saveThread(thread: Thread): Promise<Thread> {
        // sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update

        console.log(thread.title);
        console.log(thread.author);
        console.log(thread.body);
        console.log(thread.tags);
        console.log(thread.id);
        console.log(thread.threadPostId);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.saveThreadURL, JSON.stringify(thread), options)
                    .toPromise()
                    .then()
                    .catch(this.handleError);

    } // saveThread()

}