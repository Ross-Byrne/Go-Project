
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// pages
import { AppComponent }             from './app.component';
import { DashboardComponent }       from './dashboard.component/dashboard.component';
import { LoginComponent }           from './login.component/login.component';
import { SignUpComponent }          from './sign-up.component/sign-up.component';
import { PostPartialComponent }     from './post-partial.component/post-partial.component';
import { ForumPageComponent }       from './forum-page.component/forum-page.component';
import { ThreadPageComponent }      from './thread-page.component/thread-page.component';

// services
import { ThreadService }            from './thread-page.component/thread.service';
import { HeroService }              from './hero.service/hero.service';
import { routing }                  from './app.routing/app.routing';
import { ForumPostsService }        from './forum-posts.service/forum-posts.service';
import { AuthenticationService }    from './auth.service/authentication.service';
import { UserService }              from './user.service/user.service';

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
        LoginComponent,
        SignUpComponent,
        PostPartialComponent,
        ForumPageComponent,
        ThreadPageComponent,
    ],
    providers: [
        HeroService,
        ThreadService,
        ForumPostsService,
        AuthenticationService,
        UserService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
}