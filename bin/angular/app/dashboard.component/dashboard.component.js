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
var thread_service_1 = require('../thread.service/thread.service');
var authentication_service_1 = require('../auth.service/authentication.service');
var DashboardComponent = (function () {
    function DashboardComponent(router, threadService, authenticationService) {
        this.router = router;
        this.threadService = threadService;
        this.authenticationService = authenticationService;
        this.loading = false;
        //variables for paging
        this.startIndex = 0;
        this.threadsPerPage = 5;
        //array of threads to be displayed
        this.threads = [];
    }
    //calls threads on page load
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        // check if logged in
        if (this.authenticationService.userName === "") {
            // go to the login page
            this.router.navigate(['/login']);
        } // if
        this.threadService.getThreads()
            .then(function (threads) { return _this.threads = threads.filter(function (item) { return item.Author == _this.authenticationService.userName; }); })
            .then(function () { _this.loading = false; });
    }; //ngOnInit()
    //link to view thread and all its posts
    DashboardComponent.prototype.gotoDetail = function (thread) {
        var link = ['/threads', thread.ThreadPostId, thread.Title];
        this.router.navigate(link);
    }; //gotoDetail()
    //Moves to next Page of threads
    DashboardComponent.prototype.nextPage = function () {
        if (this.startIndex < this.threads.length - this.threadsPerPage) {
            this.startIndex++;
        } // if;
    }; // nextPage()
    //Moves to previous Page of threads
    DashboardComponent.prototype.previousPage = function () {
        if (this.startIndex > 0) {
            this.startIndex--;
        } // if
    }; // previousPage()
    //Moves to last Page of threads
    DashboardComponent.prototype.lastPage = function () {
        while (this.startIndex < this.threads.length - this.threadsPerPage) {
            this.startIndex++;
        } // if;
    }; // lastPage()
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-dashboard',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, thread_service_1.ThreadService, authentication_service_1.AuthenticationService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent; //end dashboard
//# sourceMappingURL=dashboard.component.js.map