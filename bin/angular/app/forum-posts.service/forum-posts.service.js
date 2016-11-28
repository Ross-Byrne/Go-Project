"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
//import { POSTS } from '../test-data/posts-test'; // test data
var ForumPostsService = (function () {
    function ForumPostsService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // local development urls
        this.savePostURL = 'http://localhost:8080/api/savePost'; // URL to web api
        this.getThreadPostsURL = 'http://localhost:8080/api/getThreadPosts'; // URL to web api
    }
    ForumPostsService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    // production urls
    // private savePostURL = 'http://goproject.ukwest.cloudapp.azure.com:8080/api/savePost';  // URL to web api
    // private getThreadPostsURL = 'http://goproject.ukwest.cloudapp.azure.com:8080/api/getThreadPosts';  // URL to web api
    ForumPostsService.prototype.extractData = function (res) {
        var body = res.json();
        //console.log(body);
        return body || {};
    };
    ForumPostsService.prototype.getPostsByThreadId = function (id) {
        // POST sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update
        var user;
        user = JSON.parse(localStorage.getItem("user"));
        // create object to send to server, including session cookie
        var data = { "Cookie": user.cookie, "Id": id };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getThreadPostsURL, JSON.stringify(data), options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }; // getPostsByThreadId()
    ForumPostsService.prototype.createPost = function (post) {
        // POST sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update
        var user;
        user = JSON.parse(localStorage.getItem("user"));
        // create object to send data to server including session cookie
        var data = { "Cookie": user.cookie, "post": post };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.savePostURL, JSON.stringify(data), options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }; // createPost()
    ForumPostsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ForumPostsService);
    return ForumPostsService;
}());
exports.ForumPostsService = ForumPostsService; // class
//# sourceMappingURL=forum-posts.service.js.map