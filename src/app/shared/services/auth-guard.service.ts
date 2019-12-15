import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    // We use the map operator here to transform and return a observable of the 'boolean' type, rather than of the 'user' type
    return this.auth.user$.pipe(
      map(user => {
        if (user)
          return true;

        this.router.navigate(['/login'], { queryParams: {returnURL: state.url } });
        return false;
      })
    );
  }

}

