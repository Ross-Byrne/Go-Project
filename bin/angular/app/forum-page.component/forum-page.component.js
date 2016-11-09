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
var common_1 = require('@angular/common');
var post_1 = require('../classes/post/post');
var thread_posts_1 = require('../classes/thread-posts/thread-posts');
var forum_posts_service_1 = require('../forum-posts.service/forum-posts.service');
var ForumPageComponent = (function () {
    function ForumPageComponent(forumPostsService, route, location) {
        this.forumPostsService = forumPostsService;
        this.route = route;
        this.location = location;
        this.title = "Thread Name"; // thread name
        //thread: Thread;
        this.threadPosts = new thread_posts_1.ThreadPosts(); // initialise object
        // text for post
        this.postText = "";
        this.startIndex = 0; // starting index of displayed posts
        this.postsPerPage = 8;
    }
    ForumPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // for each parameter in the route url
        this.route.params.forEach(function (params) {
            // get the param id
            var id = +params['id'];
            // get the posts from the thread with the id from the url
            _this.forumPostsService.getPostsByThreadId(id)
                .then(function (threadPosts) { return _this.threadPosts = threadPosts; }); // save the posts object
        });
    }; // ngOnInit()
    ForumPageComponent.prototype.nextPage = function () {
        if (this.startIndex < this.threadPosts.posts.length - this.postsPerPage) {
            this.startIndex++;
        } // if;
    }; // nextPage()
    ForumPageComponent.prototype.previousPage = function () {
        if (this.startIndex > 0) {
            this.startIndex--;
        } // if
    }; // previousPage()
    ForumPageComponent.prototype.savePost = function (postBody) {
        var _this = this;
        var post = new post_1.Post();
        post.authorId = "ross";
        post.authorName = "Ross";
        post.body = postBody;
        post.threadId = this.threadPosts.threadId;
        post.id = this.threadPosts.posts.length + 1;
        this.forumPostsService.addPostByThreadId(this.threadPosts.threadId, post) // add the post to DB
            .then(function (threadPosts) { return _this.threadPosts = threadPosts; }) // update posts on screen
            .then(function () { _this.goToBottomOfPage(10); }) // scroll to bottom of page
            .then(function () { _this.nextPage(); }); // try go to next page just incase your post ends up on there
        this.forumPostsService.createPost(postBody);
        // clear the post textarea
        this.postText = "";
    }; // savePost
    ForumPageComponent.prototype.goToBottomOfPage = function (timeout) {
        // wait a selected amount of time before scrolling to bottom of page
        window.setTimeout(function () { document.getElementById('bottomOfPage').scrollIntoView(); }, timeout);
    }; // goToBottomOfPage()
    ForumPageComponent.prototype.goToTopOfPage = function (timeout) {
        // wait a selected amount of time before scrolling to bottom of page
        window.setTimeout(function () { document.getElementById('topOfPage').scrollIntoView(); }, timeout);
    }; // goToTopOfPage()
    ForumPageComponent.prototype.goBack = function () {
        this.location.back();
    };
    ForumPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'forum-page',
            templateUrl: 'forum-page.component.html'
        }), 
        __metadata('design:paramtypes', [forum_posts_service_1.ForumPostsService, router_1.ActivatedRoute, common_1.Location])
    ], ForumPageComponent);
    return ForumPageComponent;
}());
exports.ForumPageComponent = ForumPageComponent;
//# sourceMappingURL=forum-page.component.js.map