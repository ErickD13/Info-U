import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SurveysComponent } from './profile/surveys/surveys.component';
import { UpdateComponent } from './profile/update/update.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    // [...]
    { path: 'login', redirectTo: '/user/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', redirectTo: '/user/register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'verify', redirectTo: '/user/verify', pathMatch: 'full' },
    { path: 'verify', component: VerifyEmailComponent, canActivate: [AuthGuard] },
    { path: 'recovery', redirectTo: '/user/recovery', pathMatch: 'full' },
    { path: 'recovery', component: RecoveryPasswordComponent, canActivate: [AuthGuard] },
    { path: 'profile/update', redirectTo: '/user/profile/update', pathMatch: 'full' },
    { path: 'profile/update', component: UpdateComponent, canActivate: [AuthGuard] },
    { path: 'profile/surveys', redirectTo: '/user/profile/surveys', pathMatch: 'full' },
    { path: 'profile/surveys', component:  SurveysComponent, canActivate: [AuthGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
