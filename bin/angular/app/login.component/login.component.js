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
var authentication_service_1 = require('../auth.service/authentication.service');
var session_cookie_1 = require('../classes/session-cookie/session-cookie');
var LoginComponent = (function () {
    function LoginComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.title = "Login Page";
        this.model = {};
        this.loading = false;
        this.cookie = new session_cookie_1.SessionCookie();
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .then(function (cookie) { return _this.cookie = cookie; })
            .then(function () {
            if (_this.cookie.AuthToken != "") {
                // stop loading
                _this.loading = false;
                // go to home page
                _this.router.navigate(['/']);
            }
            else {
                // stop loading
                _this.loading = false;
                // handled incorrect login details
                console.log("Not logged in");
            }
        });
        console.log(this.cookie);
        // this.authenticationService.login(this.model.username, this.model.password)
        //     .subscribe(
        //         data => {
        //             //on sucessful log in nav to following
        //             this.router.navigate(['/']);
        //         },
        //         error => {
        //           //log or display error
        //             console.log("Unable to login: "+error);
        //             this.loading = false;
        //         });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login-page',
            templateUrl: 'login.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map