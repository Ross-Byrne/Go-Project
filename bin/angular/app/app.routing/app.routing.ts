
// System imports
import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

// page imports
import { DashboardComponent }       from '../dashboard.component/dashboard.component';
import { LoginComponent }           from '../login.component/login.component';
import { SignUpComponent }          from '../sign-up.component/sign-up.component';
import { ThreadPageComponent }      from '../thread-page.component/thread-page.component';
import { ForumPageComponent }       from '../forum-page.component/forum-page.component';          


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
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'threads',
        component: ThreadPageComponent
    },
    {
        path: 'threads/:id/:id2',
        component: ForumPageComponent       // show the posts for the thread with id = id in address url
    },

    //if cannot find url redirect to 
    { path: '**', redirectTo: '/dashboard' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);