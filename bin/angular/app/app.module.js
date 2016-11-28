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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
// pages
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./dashboard.component/dashboard.component');
var login_component_1 = require('./login.component/login.component');
var sign_up_component_1 = require('./sign-up.component/sign-up.component');
var post_partial_component_1 = require('./post-partial.component/post-partial.component');
var forum_page_component_1 = require('./forum-page.component/forum-page.component');
var thread_page_component_1 = require('./thread-page.component/thread-page.component');
// services
var thread_service_1 = require('./thread.service/thread.service');
var app_routing_1 = require('./app.routing/app.routing');
var forum_posts_service_1 = require('./forum-posts.service/forum-posts.service');
var authentication_service_1 = require('./auth.service/authentication.service');
var user_service_1 = require('./user.service/user.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                login_component_1.LoginComponent,
                sign_up_component_1.SignUpComponent,
                post_partial_component_1.PostPartialComponent,
                forum_page_component_1.ForumPageComponent,
                thread_page_component_1.ThreadPageComponent,
            ],
            providers: [
                thread_service_1.ThreadService,
                forum_posts_service_1.ForumPostsService,
                authentication_service_1.AuthenticationService,
                user_service_1.UserService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map