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
var thread_1 = require('../classes/thread/thread');
var thread_service_1 = require('../thread.service/thread.service');
var ThreadPageComponent = (function () {
    function ThreadPageComponent(router, threadService) {
        this.router = router;
        this.threadService = threadService;
        //variables for paging
        this.startIndex = 0;
        this.threadsPerPage = 5;
        //array of threads to be displayed
        this.threads = [];
        //variables for making a new post
        this.threadTitle = "";
        this.threadBody = "";
        this.threadTags = "";
        this.errorLabel = "";
        //toggle to move to bottom of page
        this.opened = false;
    }
    ThreadPageComponent.prototype.toggle = function () {
        this.opened = !this.opened;
        this.goToBottomOfPage(10);
    };
    //calls threads on page load
    ThreadPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.threadService.getThreads()
            .then(function (threads) { return _this.threads = threads; });
    };
    //link to view thread and all its posts
    ThreadPageComponent.prototype.gotoDetail = function (thread) {
        var link = ['/threads', thread.ThreadPostId];
        this.router.navigate(link);
    };
    //Moves to next Page of threads
    ThreadPageComponent.prototype.nextPage = function () {
        if (this.startIndex < this.threads.length - this.threadsPerPage) {
            this.startIndex++;
        } // if;
    }; // nextPage()
    //Moves to previous Page of threads
    ThreadPageComponent.prototype.previousPage = function () {
        if (this.startIndex > 0) {
            this.startIndex--;
        } // if
    }; // previousPage()
    //Moves to last Page of threads
    ThreadPageComponent.prototype.lastPage = function () {
        while (this.startIndex < this.threads.length - this.threadsPerPage) {
            this.startIndex++;
        } // if;
    }; // lastPage()
    //scrolls to bottomOfPage
    ThreadPageComponent.prototype.goToBottomOfPage = function (timeout) {
        // wait a selected amount of time before scrolling to bottom of page
        window.setTimeout(function () { document.getElementById('bottomOfPage').scrollIntoView(); }, timeout);
    }; // goToBottomOfPage()
    //scrolls to topOfPage
    ThreadPageComponent.prototype.goToTopOfPage = function (timeout) {
        // wait a selected amount of time before scrolling to bottom of page
        window.setTimeout(function () { document.getElementById('topOfPage').scrollIntoView(); }, timeout);
    }; // goToTopOfPage()
    //passes a new thread to the go server
    ThreadPageComponent.prototype.saveThread = function (threadTitle, threadBody, threadTags) {
        //add validation to avoid blank posts
        var _this = this;
        if (threadTitle == "" || threadBody == "" || threadTags == "") {
            this.errorLabel = "Insufficent Data";
        }
        else {
            var thread = new thread_1.Thread();
            var splitTags = threadTags.split(",");
            //initialise thread struct from parameters
            thread.Author = "Martin";
            thread.Title = threadTitle;
            thread.Body = threadBody;
            thread.Tags = splitTags;
            thread.Id = "";
            thread.ThreadPostId = "";
            // save thread in couchDB
            this.threadService.saveThread(thread)
                .then(function () {
                _this.threadService.getThreads()
                    .then(function (threads) { return _this.threads = threads; });
            })
                .then(function () { _this.goToBottomOfPage(10); }) // scroll to the bottom of the page (so thread can be seen)
                .then(function () { _this.lastPage(); }); // try to go to the last page
            //gets latest threads
            this.threadService.getThreads()
                .then(function (threads) { return _this.threads = threads; });
            // clear the make post objects
            this.threadTitle = "";
            this.threadBody = "";
            this.threadTags = "";
            this.errorLabel = "";
        } //end else
        //gets latest threads
        this.threadService.getThreads()
            .then(function (threads) { return _this.threads = threads; });
    }; // saveThread()
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
exports.ThreadPageComponent = ThreadPageComponent; //end ThreadPageComponent
//# sourceMappingURL=thread-page.component.js.map