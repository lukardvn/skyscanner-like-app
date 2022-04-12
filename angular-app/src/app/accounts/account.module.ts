import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAccountsComponent } from './all-accounts/all-accounts.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EmailConfirmedComponent } from './email-confirmed/email-confirmed.component';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PhoneFormatDirective } from './phone-format.directive';



@NgModule({
  declarations: [
    AllAccountsComponent,
    EditProfileComponent,
    EmailConfirmedComponent,
    EmailSentComponent,
    HomeComponent,
    ListUsersComponent,
    LoginFormComponent,
    NoAccessComponent,
    SignupFormComponent,
    UserProfileComponent,
    PhoneFormatDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    AllAccountsComponent,
    EditProfileComponent,
    EmailConfirmedComponent,
    EmailSentComponent,
    HomeComponent,
    ListUsersComponent,
    LoginFormComponent,
    NoAccessComponent,
    SignupFormComponent,
    UserProfileComponent,
    PhoneFormatDirective
  ]
})
export class AccountModule { }
