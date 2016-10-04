
// System imports
import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

// page imports
import { DashboardComponent }       from '../dashboard.component/dashboard.component';
import { HeroesComponent }          from '../heroes.component/heroes.component';
import { HeroDetailComponent }      from '../hero-detail.component/hero-detail.component';
import { LoginComponent }           from '../login.component/login.component';
import { SignUpComponent }          from '../sign-up.component/sign-up.component';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'heroes',
        component: HeroesComponent
    },
    {
        path: 'detail/:id',
        component: HeroDetailComponent
    },
    {
        path: 'detail/:id',
        component: HeroDetailComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);