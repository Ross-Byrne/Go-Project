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
var thread_1 = require('../classes/thread/thread');
var mock_threads_1 = require('../mock-threads');
var ThreadService = (function () {
    function ThreadService(http) {
        this.http = http;
        this.saveThreadURL = 'http://localhost:8080/api/saveThread'; // URL to web api
    }
    ThreadService.prototype.handleError = function (error) {
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
    // uses a Promise to return threads asynchronously onces they are ready
    ThreadService.prototype.getThreads = function () {
        return Promise.resolve(mock_threads_1.THREADS);
    };
    ThreadService.prototype.getThread = function (id) {
        return this.getThreads()
            .then(function (threads) { return threads.find(function (thread) { return thread.id === id; }); });
    };
    ThreadService.prototype.saveThreadTest = function (thread) {
        //create Thread
        console.log(thread.title);
        console.log(thread.author);
        console.log(thread.body);
        console.log(thread.tags);
        console.log(thread.id);
    };
    ThreadService.prototype.saveThread = function (thread) {
        // sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.saveThreadURL, JSON.stringify(thread_1.Thread), options)
            .toPromise()
            .then()
            .catch(this.handleError);
    }; // saveThread()
    ThreadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ThreadService);
    return ThreadService;
}());
exports.ThreadService = ThreadService;
//# sourceMappingURL=thread.service.js.map