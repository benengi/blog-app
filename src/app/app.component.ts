import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { User } from './data/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected loading = true;
  protected user: User;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.loading = false;
    });
  }
}
