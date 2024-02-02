import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating app';

  constructor(private accountService: AccountService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userString = localStorage.getItem('user');
      if (!userString) return;
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
    }
  }

}
