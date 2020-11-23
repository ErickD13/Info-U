import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PolicyComponent } from './components/legal/policy/policy.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user/login', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', redirectTo: '/user/register', pathMatch: 'full' },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/profile', redirectTo: '/user/profile', pathMatch: 'full' },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'policy', redirectTo: '/policy', pathMatch: 'full' },
  { path: 'policy', component: PolicyComponent },
  { path: 'terms', redirectTo: '/terms', pathMatch: 'full' },
  { path: 'terms', component: PolicyComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
