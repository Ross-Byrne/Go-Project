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
var forum_posts_service_1 = require('../forum-posts.service/forum-posts.service');
var ForumPageComponent = (function () {
    function ForumPageComponent(forumPostsService, route, location) {
        this.forumPostsService = forumPostsService;
        this.route = route;
        this.location = location;
    }
    ForumPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // for each parameter in the route url
        this.route.params.forEach(function (params) {
            // get the param id
            var id = +params['id'];
            // get the posts from the thread with the id from the url
            _this.forumPostsService.getPostsByThreadId(id)
                .then(function (posts) { return _this.posts = posts; }); // save the posts in a local array
        });
    };
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