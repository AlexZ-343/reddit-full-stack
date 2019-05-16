import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import { RadioButtonModule } from 'primeng/components/radioButton/radioButton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {CardModule, DialogModule, InputTextModule, TabMenuModule} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import {LoginService} from './login/login.service';
import { PostsComponent } from './posts/posts.component';
import { MastermockInterceptor } from 'ngx-mastermock';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

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
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    TabMenuModule,
    TableModule,
    RouterModule.forRoot([{path: '', component: HeaderComponent}]),
    DialogModule,
    InputTextModule,
    CardModule
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MastermockInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
