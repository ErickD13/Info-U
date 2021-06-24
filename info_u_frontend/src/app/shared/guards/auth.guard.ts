import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      switch (state.url) {
        case '/user/login':
        case '/user/register':
        case '/user/verify':
        case '/user/recovery':
          this.router.navigate(['/'])
          break;
        default:
          break;
      }
    } else {
      switch (state.url) {
        case '/user/profile/update':
        case '/user/profile/surveys':
          this.router.navigate(['/user/login'])
          break;
        default:
          break;
      }
    }
    return true;
  }

}
