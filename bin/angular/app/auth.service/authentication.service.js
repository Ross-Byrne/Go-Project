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
//adapted from http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
// System imports
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var user_1 = require('../classes/user/user');
var session_cookie_1 = require('../classes/session-cookie/session-cookie');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // local development urls
        this.loginUrl = 'http://localhost:8080/api/login';
        this.logoutUrl = 'http://localhost:8080/api/logout';
        // production urls
        // private loginUrl = 'http://goproject.ukwest.cloudapp.azure.com:8080/api/login';
        // private logoutUrl = 'http://goproject.ukwest.cloudapp.azure.com:8080/api/logout';
        this.userName = "";
        this.userNameMessage = "";
    }
    AuthenticationService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    AuthenticationService.prototype.ngOnInit = function () {
        // check it logged in
        if (localStorage.getItem("user") == null) {
            // update username
            this.userName = "";
            this.userNameMessage = "";
        }
        else {
            // get the current logged in user
            var user = JSON.parse(localStorage.getItem("user"));
            // set the username variables
            this.userName = user.username;
            this.userNameMessage = "Hello, " + user.username;
        } // if
    }; // ngOnInit()
    // logs the user in, returns the user object
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        // clear the cached user
        localStorage.removeItem("user");
        // set the headers for POST
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var user = new user_1.User(); // create user object
        user.username = username; // set username
        // create new cookie object
        var cookie = new session_cookie_1.SessionCookie();
        cookie.AuthToken = ""; // set defualt value
        // post login details to Go server
        return this.http.post(this.loginUrl, JSON.stringify({ username: username, password: password }), options)
            .toPromise()
            .then(function (res) {
            cookie = _this.extractData(res); // get the cookie
            user.cookie = cookie; // set the cookie in user object
            _this.userName = user.username;
            _this.userNameMessage = "Hello, " + user.username;
            return user; // return the user object to caller
        });
    }; // login()
    // log the current user out
    AuthenticationService.prototype.logout = function () {
        this.userName = "";
        this.userNameMessage = "";
        // make a new instance of user object
        var user = new user_1.User();
        // get the current logged in user
        user = JSON.parse(localStorage.getItem("user"));
        // if already logged out
        if (user == null) {
            return;
        }
        // clear the cached user
        localStorage.removeItem("user");
        // set the headers for POST
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        // post login details to Go server
        return this.http.post(this.logoutUrl, JSON.stringify(user.cookie), options)
            .toPromise()
            .catch();
    }; // logout()
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService; //end authentication.service
//# sourceMappingURL=authentication.service.js.map