"use strict";
var router_1 = require('@angular/router');
// page imports
var dashboard_component_1 = require('../dashboard.component/dashboard.component');
var login_component_1 = require('../login.component/login.component');
var sign_up_component_1 = require('../sign-up.component/sign-up.component');
var thread_page_component_1 = require('../thread-page.component/thread-page.component');
var forum_page_component_1 = require('../forum-page.component/forum-page.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'signup',
        component: sign_up_component_1.SignUpComponent
    },
    {
        path: 'threads',
        component: thread_page_component_1.ThreadPageComponent
    },
    {
        path: 'threads/:id',
        component: forum_page_component_1.ForumPageComponent // show the posts for the thread with id = id in address url
    },
    //if cannot find url redirect to 
    { path: '**', redirectTo: '/dashboard' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map