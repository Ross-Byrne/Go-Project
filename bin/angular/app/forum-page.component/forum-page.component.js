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
var router_2 = require('@angular/router');
var post_1 = require('../classes/post/post');
var thread_posts_1 = require('../classes/thread-posts/thread-posts');
var forum_posts_service_1 = require('../forum-posts.service/forum-posts.service');
var authentication_service_1 = require('../auth.service/authentication.service');
var ForumPageComponent = (function () {
    function ForumPageComponent(forumPostsService, authenticationService, route, router, location) {
        this.forumPostsService = forumPostsService;
        this.authenticationService = authenticationService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.title = "Thread Name"; // thread name
        //thread: Thread;
        this.threadPosts = new thread_posts_1.ThreadPosts(); // initialise object
        this.threadPostsId = "";
        // text for post
        this.postText = "";
        this.startIndex = 0; // starting index of displayed posts
        this.postsPerPage = 8;
    }
    ForumPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check it logged in
        if (localStorage.getItem("user") == null) {
            // go to the login page
            this.router.navigate(['/login']);
        } // if
        // for each parameter in the route url
        this.route.params.forEach(function (params) {
            // get the param id (this is the threadPostId)
            var id = params['id'];
            _this.threadPostsId = id;
            // get the posts from the thread with the id from the url
            _this.forumPostsService.getPostsByThreadId(id)
                .then(function (threadPosts) { return _this.threadPosts = threadPosts; }); // save the posts object
        });
    }; // ngOnInit()
    ForumPageComponent.prototype.nextPage = function () {
        if (this.startIndex < this.threadPosts.Posts.length - this.postsPerPage) {
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
        post.AuthorId = "";
        post.AuthorName = this.authenticationService.userName;
        post.Body = postBody;
        post.ThreadPostId = this.threadPostsId; // this equals threadPosts._id (from couchDB)(used for saving)
        post.Id = ""; // this is set on the server
        this.forumPostsService.createPost(post) // save the post in couchDB
            .then(function (threadPosts) { return _this.threadPosts = threadPosts; }) // update posts on screen
            .then(function () { _this.goToBottomOfPage(10); }) // scroll to bottom of page
            .then(function () { _this.nextPage(); }); // try go to next page just incase your post ends up on there
        // this.forumPostsService.createPost(post);
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
        __metadata('design:paramtypes', [forum_posts_service_1.ForumPostsService, authentication_service_1.AuthenticationService, router_1.ActivatedRoute, router_2.Router, common_1.Location])
    ], ForumPageComponent);
    return ForumPageComponent;
}());
exports.ForumPageComponent = ForumPageComponent;
//# sourceMappingURL=forum-page.component.js.map