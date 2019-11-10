import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from './data/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog-app';

  constructor(private auth: AuthService) {
  }
}
