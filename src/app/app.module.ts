import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule, DialogModule, InputTextModule, MenuModule, TabMenuModule} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { RouterModule, Routes} from '@angular/router';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { PostsComponent } from './posts/posts.component';
import { MastermockInterceptor } from 'ngx-mastermock';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import { PostService} from './posts/posts.service';
import { OAuthModule, OAuthService} from 'angular-oauth2-oidc';
import { AuthGuardService} from './auth/auth-guard.service';
import { ReactiveFormsService} from './shared/reactive-forms.service';
import { SignupService} from './register-modal/register-modal.service';
import { LoginModalService} from './login-modal/login-modal.service';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { AuthService} from './auth/auth.service';
import { JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {LoginComponent} from './login/login.component';
import {LoginService} from './login/login.service';
import { CreatePostComponent } from './create-post/create-post.component';
import {CreatePostService} from './create-post/create-post.service';
import {PostCommentsService} from './post-comments/post-comments.service';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import {routes} from './app.routing';
import { UserProfileComponent } from './user-profile/user-profile.component';

// const routes: Routes = [
//   { path: 'login-modal', component: LoginModalComponent },
//   { path: '', component: PostsComponent },
//   { path: 'login', component: LoginModalComponent},
//   { path: 'register', component: RegisterModalComponent},
//   { path: 'post-comments', component: PostCommentsComponent},
//   { path: 'create-post', component: CreatePostComponent},
//   // { path: '', redirectTo: 'home', pathMatch: 'full'},
//   { path: '**', redirectTo: 'login'}
// ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterModalComponent,
    LoginModalComponent,
    PostsComponent,
    PostCommentsComponent,
    CreatePostComponent,
    RightSidebarComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    TabMenuModule,
    MenuModule,
    TableModule,
    RouterModule.forRoot(routes),
    DialogModule,
    InputTextModule,
    CardModule,
    HttpClientModule,
    OAuthModule,
    OAuthModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['http://localhost:4200/auth/login']
      }
    })
  ],
  providers: [
    LoginService,
    LoginModalService,
    PostService,
    SignupService,
    CreatePostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MastermockInterceptor,
      multi: true
    },
    HttpClient,
    OAuthService,
    ReactiveFormsService,
    AuthGuardService,
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    PostCommentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
