"use strict";
var router_1 = require('@angular/router');
// page imports
var dashboard_component_1 = require('../dashboard.component/dashboard.component');
var heroes_component_1 = require('../heroes.component/heroes.component');
var hero_detail_component_1 = require('../hero-detail.component/hero-detail.component');
var login_component_1 = require('../login.component/login.component');
var sign_up_component_1 = require('../sign-up.component/sign-up.component');
var settings_component_1 = require('../settings.component/settings.component');
var code_panel_component_1 = require('../code-panel.component/code-panel.component');
var code_snippets_component_1 = require('../code-snippets.component/code-snippets.component');
var thread_page_component_1 = require('../thread-page.component/thread-page.component');
var fourm_page_component_1 = require('../fourm-page.component/fourm-page.component'); // just for tests
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
        path: 'heroes',
        component: heroes_component_1.HeroesComponent
    },
    {
        path: 'detail/:id',
        component: hero_detail_component_1.HeroDetailComponent
    },
    {
        path: 'detail/:id',
        component: hero_detail_component_1.HeroDetailComponent
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
        path: 'settings',
        component: settings_component_1.SettingsComponent
    },
    {
        path: 'codepanel',
        component: code_panel_component_1.CodePanelComponent
    },
    {
        path: 'snippets',
        component: code_snippets_component_1.CodeSnippetsComponent
    },
    {
        path: 'threads',
        component: thread_page_component_1.ThreadPageComponent
    },
    {
        path: 'posts',
        component: fourm_page_component_1.FourmPageComponent // just for tests
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map