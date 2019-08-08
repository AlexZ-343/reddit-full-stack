import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule, DialogModule, InputTextModule, TabMenuModule} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import {RouterModule, Routes} from '@angular/router';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import {LoginService} from './login/login.service';
import { PostsComponent } from './posts/posts.component';
import { MastermockInterceptor } from 'ngx-mastermock';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {PostService} from './posts/posts.service';
import {OAuthModule, OAuthService} from 'angular-oauth2-oidc';
import {AuthGuard} from '../providers/auth/auth.guard.service';
import {ReactiveFormsService} from './shared/reactive-forms.service';
import {SignupService} from './sign-up-modal/sign-up-modal.service';

const appRoutes: Routes = [
  {path: 'login-modal', component: LoginModalComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignUpModalComponent,
    LoginModalComponent,
    PostsComponent
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
    TableModule,
    RouterModule.forRoot([{path: '', component: HeaderComponent}]),
    DialogModule,
    InputTextModule,
    CardModule,
    HttpClientModule,
    OAuthModule,
    OAuthModule.forRoot()
  ],
  providers: [
    LoginService,
    PostService,
    SignupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MastermockInterceptor,
      multi: true
    },
    HttpClient,
    OAuthService,
    ReactiveFormsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
