
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from '../classes/post/post';
import { ThreadPosts } from '../classes/thread-posts/thread-posts';
import { POSTS } from '../test-data/posts-test';

@Injectable()
export class ForumPostsService {

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

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});

    private savePostURL = 'http://localhost:8080/api/savePost';  // URL to web api

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    
    }


    // uses a Promise to return posts asynchronously onces they are ready
    getPostsByThreadId(id: number): Promise<ThreadPosts> {

        return Promise.resolve(POSTS).then(posts => posts.find(posts => posts.threadId === id));
        
    } // getPostsByThreadId()

    addPostByThreadId(id: number, post: Post): Promise<ThreadPosts>{

        Promise.resolve(POSTS).then(posts => posts.find(posts => posts.threadId === id).posts.push(post));

        return this.getPostsByThreadId(id);

    } // addPostByThreadId()

    createPost(message: string): Promise<Post> {
        // sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.savePostURL, '{"message":"' + message + '"}', options)
                    .toPromise()
                    .then()
                    .catch(this.handleError);

    } // createPost()

} // class