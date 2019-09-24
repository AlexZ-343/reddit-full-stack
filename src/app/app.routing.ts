import { Routes, CanActivate } from '@angular/router';
// import { ProfileComponent } from './profile/profile.component';
import {
  AuthGuardService,
  AuthGuardService as AuthGuard
} from './auth/auth-guard.service';
import {RoleGuardService} from './auth/role-guard.service';
import {AppComponent} from './app.component';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {RegisterModalComponent} from './register-modal/register-modal.component';
import {PostCommentsComponent} from './post-comments/post-comments.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {PostsComponent} from './posts/posts.component';


export const routes: Routes = [
  // { path: 'login-modal', component: LoginModalComponent },
  { path: '', component: PostsComponent },
  // { path: 'login', component: LoginModalComponent},
  // { path: 'register', component: RegisterModalComponent},
  { path: 'post-comments', component: PostCommentsComponent},
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: ''}
  ];
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [RoleGuard],
  //   data: {
  //     expectedRole: 'admin'
  //   }
  // },
  // { path: '**', redirectTo: '' }
