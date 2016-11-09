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
var thread_service_1 = require('./thread.service');
var ThreadPageComponent = (function () {
    function ThreadPageComponent(router, threadService) {
        this.router = router;
        this.threadService = threadService;
        //title = "Threads";
        this.threads = [];
    }
    ThreadPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.threadService.getThreads()
            .then(function (threads) { return _this.threads = threads.slice(0, 10); });
    };
    ThreadPageComponent.prototype.gotoDetail = function (thread) {
        var link = ['/thread', thread.id];
        this.router.navigate(link);
    };
    ThreadPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'thread-page',
            templateUrl: 'thread-page.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, thread_service_1.ThreadService])
    ], ThreadPageComponent);
    return ThreadPageComponent;
}());
exports.ThreadPageComponent = ThreadPageComponent;
//# sourceMappingURL=thread-page.component.js.map