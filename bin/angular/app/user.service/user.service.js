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
// System imports
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        // local development urls
        this.userURL = 'http://localhost:8080/api/createUser';
    }
    // production urls
    // private userURL = 'http://goproject.ukwest.cloudapp.azure.com:8080/api/createUser';
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    // signs the user up, returns if it worked or not
    UserService.prototype.signup = function (username, password) {
        // set the headers for POST
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        //debugging for username and password
        //console.log({username: username, password: password});
        // post login details to Go server
        return this.http.post(this.userURL, JSON.stringify({ username: username, password: password }), options)
            .toPromise()
            .then(function () {
            return true;
        })
            .catch(function () {
            return false;
        });
    }; // signup()
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService; //end User.Service
//# sourceMappingURL=user.service.js.map