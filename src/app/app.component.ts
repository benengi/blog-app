import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './data/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog-app';
  protected loading = true;
  protected user: User;
  protected loading$: Observable<boolean>;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    /* this.auth.user$.subscribe(user => {
      this.user = user;
      this.loading = false;
    }); */
    this.loading$ = this.auth.user$.pipe(
      switchMap((user: User) => {
        this.user = user;
        this.loading = false;
        return of(true);
      })
    );

    this.loading$.subscribe();
  }
}
