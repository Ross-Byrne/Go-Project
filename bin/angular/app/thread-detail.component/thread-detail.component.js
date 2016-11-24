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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var thread_1 = require('../classes/thread/thread');
var thread_service_1 = require('../thread.service/thread.service');
var ThreadDetailComponent = (function () {
    function ThreadDetailComponent(threadService, route, location) {
        this.threadService = threadService;
        this.route = route;
        this.location = location;
    }
    ThreadDetailComponent.prototype.ngOnInit = function () {
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            //this.threadService.getThreads()
            //.then(thread => this.thread = thread);
        });
    };
    ThreadDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', thread_1.Thread)
    ], ThreadDetailComponent.prototype, "thread", void 0);
    ThreadDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-thread-detail',
            templateUrl: 'thread-detail.component.html'
        }), 
        __metadata('design:paramtypes', [thread_service_1.ThreadService, router_1.ActivatedRoute, common_1.Location])
    ], ThreadDetailComponent);
    return ThreadDetailComponent;
}());
exports.ThreadDetailComponent = ThreadDetailComponent;
//# sourceMappingURL=thread-detail.component.js.map