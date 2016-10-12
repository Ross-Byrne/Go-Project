
// System imports
import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

// page imports
import { DashboardComponent }       from '../dashboard.component/dashboard.component';
import { HeroesComponent }          from '../heroes.component/heroes.component';
import { HeroDetailComponent }      from '../hero-detail.component/hero-detail.component';
import { LoginComponent }           from '../login.component/login.component';
import { SignUpComponent }          from '../sign-up.component/sign-up.component';
import { SettingsComponent }        from '../settings.component/settings.component';
import { CodePanelComponent }       from '../code-panel.component/code-panel.component';
import { CodeSnippetsComponent }    from '../code-snippets.component/code-snippets.component';
import { ThreadPageComponent }      from '../thread-page.component/thread-page.component';
import { ForumPageComponent }       from '../forum-page.component/forum-page.component';            // just for tests


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
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'codepanel',
        component: CodePanelComponent
    },
    {
        path: 'snippets',
        component: CodeSnippetsComponent
    },
    {
        path: 'threads',
        component: ThreadPageComponent
    },
    {
        path: 'posts',
        component: ForumPageComponent       // just for tests
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);