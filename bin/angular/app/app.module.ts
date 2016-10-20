
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// pages

import { AppComponent }             from './app.component';
import { DashboardComponent }       from './dashboard.component/dashboard.component';
import { HeroesComponent }          from './heroes.component/heroes.component';
import { HeroDetailComponent }      from './hero-detail.component/hero-detail.component';
import { LoginComponent }           from './login.component/login.component';
import { SignUpComponent }          from './sign-up.component/sign-up.component';
import { SettingsComponent }        from './settings.component/settings.component';
import { PostPartialComponent }     from './post-partial.component/post-partial.component';
import { ForumPageComponent }       from './forum-page.component/forum-page.component';
import { CodePanelComponent }       from './code-panel.component/code-panel.component';
import { CodeSnippetsComponent }       from './code-snippets.component/code-snippets.component';
import { ThreadPageComponent }       from './thread-page.component/thread-page.component';
import { ThreadPartialComponent }       from './thread-partial.component/thread-partial.component';
import { ThreadDetailComponent }       from './thread-detail.component/thread-detail.component';


// services
import { ThreadService }    from './thread-page.component/thread.service';
import { HeroService }      from './hero.service/hero.service';
import { routing }          from './app.routing/app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroesComponent,
        LoginComponent,
        SignUpComponent,
        SettingsComponent,
        PostPartialComponent,
        ForumPageComponent,
        CodePanelComponent,
        CodeSnippetsComponent,
        ThreadPageComponent,
        ThreadPartialComponent,
        ThreadDetailComponent,
    ],
    providers: [
        HeroService,
        ThreadService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
}