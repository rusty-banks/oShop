import { AppUser } from 'shared/models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    // Using update() not set() to avoid overwriting everytime the user logins
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    // By default, the AngularFireObject is a service for manipulating and streaming object data
    // We've used valueChanges() to unwrap the Firebase DataSnapshot
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
