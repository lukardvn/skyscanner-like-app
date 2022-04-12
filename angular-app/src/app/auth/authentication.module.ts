import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthNavComponent } from './auth-nav/auth-nav.component';
import { AuthenticationButtonComponent } from './authentication-button/authentication-button.component';
import { SignupButtonComponent } from './signup-button/signup-button.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../../environments/environment';

@NgModule({
  declarations: [
    AuthNavComponent,
    AuthenticationButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AuthModule.forRoot(env.auth)
  ],
  exports: [
    AuthNavComponent,
    AuthenticationButtonComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
    ProfileComponent
  ],
  providers: [
    
  ]
})
export class AuthenticationModule { }
