"use strict";
var router_1 = require('@angular/router');
// page imports
var dashboard_component_1 = require('../dashboard.component/dashboard.component');
var heroes_component_1 = require('../heroes.component/heroes.component');
var hero_detail_component_1 = require('../hero-detail.component/hero-detail.component');
var login_component_1 = require('../login.component/login.component');
var sign_up_component_1 = require('../sign-up.component/sign-up.component');
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
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map