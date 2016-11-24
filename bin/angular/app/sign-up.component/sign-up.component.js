//adapted from http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
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
var router_1 = require('@angular/router');
var user_service_1 = require('../user.service/user.service');
var SignUpComponent = (function () {
    function SignUpComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.title = "Sign Up Page";
        this.model = {};
        this.loading = false;
        this.message = "";
    }
    SignUpComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        var worked = false;
        this.userService.signup(this.model.username, this.model.password) // create a user
            .then(function (status) { return worked = status; }) // get the status
            .then(function () {
            // check if the sign was successful
            if (worked === true) {
                // stop loading
                _this.loading = false;
                console.log("User Created!");
                // go to login page
                _this.router.navigate(['/login']);
            }
            else {
                // stop loading
                _this.loading = false;
                // handle error
                console.log("Error, Username taken!");
                // show error message
                _this.message = "Error! Username Already Taken.";
            } // if
        }).catch(function () {
            // stop loading
            _this.loading = false;
            // handled incorrect login details
            console.log("Error occured! Not signed up!");
            // show error message
            _this.message = "Error occured! Not signed up!";
        });
    };
    SignUpComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sign-up-page',
            templateUrl: 'sign-up.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=sign-up.component.js.map