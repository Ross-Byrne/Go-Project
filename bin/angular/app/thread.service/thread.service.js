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
var ThreadService = (function () {
    function ThreadService(http) {
        this.http = http;
        this.saveThreadURL = 'http://localhost:8080/api/saveThread'; // URL to save a thread in go
        this.getThreadURL = 'http://localhost:8080/api/getThreads'; // URL to get a threads from go
    }
    ThreadService.prototype.handleError = function (error) {
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
    //extracts data from json response
    ThreadService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    //a promise that returns a list of threads from Go server
    ThreadService.prototype.getThreads = function () {
        var user;
        user = JSON.parse(localStorage.getItem("user"));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.getThreadURL, JSON.stringify(user.cookie), options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }; //getThreads()
    //save a thread to couchDb Through the go server
    ThreadService.prototype.saveThread = function (thread) {
        var user;
        user = JSON.parse(localStorage.getItem("user"));
        // create object to send data to server including session cookie
        var data = { "Cookie": user.cookie, "thread": thread };
        // sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.saveThreadURL, JSON.stringify(data), options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }; // saveThread()
    ThreadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ThreadService);
    return ThreadService;
}());
exports.ThreadService = ThreadService; //end thread service
//# sourceMappingURL=thread.service.js.map