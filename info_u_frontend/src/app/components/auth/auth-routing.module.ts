import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    // [...]
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verify', component: VerifyEmailComponent },
    { path: 'recovery', component: RecoveryPasswordComponent },
    { path: 'profile', component: ProfileComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
