import { UserService } from 'shared/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router, ɵangular_packages_router_router_a } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    // Firebase User type Observable representing the authentication state of the current user
    this.user$ = afAuth.authState; // Not subscribing the oberservable here, instead we'll conver it into App User Observable below
  }

  login() {
    // Store the return URL in local storage
    const returnUrl = this.route.snapshot.queryParamMap.get('returnURL') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    // signInWithRedirect() takes an auth provider object
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    // uid is the property of the 'user' object is the user represented by firebase as part of authentication and not the user object stored in the database
    // We need to get the firebase 'user' object to read and read the actual application 'user' object from the database
    // BASICALLY CONVERTING THE FIREBASE USER OBSERVABLE TO APPUSER(Actual implementation in the FB DB) OBSERVABLE
    return this.user$.pipe(
      switchMap(user => {
        if (user)
          return this.userService.get(user.uid);
        else
          return of(null);
      })
    );
  }

}
