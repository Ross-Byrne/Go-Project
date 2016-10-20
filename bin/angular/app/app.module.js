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
var heroes_component_1 = require('./heroes.component/heroes.component');
var hero_detail_component_1 = require('./hero-detail.component/hero-detail.component');
var login_component_1 = require('./login.component/login.component');
var sign_up_component_1 = require('./sign-up.component/sign-up.component');
var settings_component_1 = require('./settings.component/settings.component');
var post_partial_component_1 = require('./post-partial.component/post-partial.component');
var forum_page_component_1 = require('./forum-page.component/forum-page.component');
var code_panel_component_1 = require('./code-panel.component/code-panel.component');
var code_snippets_component_1 = require('./code-snippets.component/code-snippets.component');
var thread_page_component_1 = require('./thread-page.component/thread-page.component');
var thread_partial_component_1 = require('./thread-partial.component/thread-partial.component');
// services
var hero_service_1 = require('./hero.service/hero.service');
var app_routing_1 = require('./app.routing/app.routing');
var forum_posts_service_1 = require('./forum-posts.service/forum-posts.service');
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
                hero_detail_component_1.HeroDetailComponent,
                heroes_component_1.HeroesComponent,
                login_component_1.LoginComponent,
                sign_up_component_1.SignUpComponent,
                settings_component_1.SettingsComponent,
                post_partial_component_1.PostPartialComponent,
                forum_page_component_1.ForumPageComponent,
                code_panel_component_1.CodePanelComponent,
                code_snippets_component_1.CodeSnippetsComponent,
                thread_page_component_1.ThreadPageComponent,
                thread_partial_component_1.ThreadPartialComponent,
            ],
            providers: [
                hero_service_1.HeroService,
                forum_posts_service_1.ForumPostsService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map