import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Subscribing to the user$ observable of our authentication service to redirect them to the appropriate page
  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
    auth.user$.subscribe(user => {
      if (!user)
        return;

      userService.save(user); // Storing user to the DB everytime they login | Since we don't have the concept of registeration

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl)
        return;

      // To remove returnUrl once users are logged in to avoid redirect to the 'index' page on page reloads
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
