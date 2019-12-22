import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { User } from 'src/app/data/user.model';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ui-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() user: User;
  constructor(
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
  }

  notYetImplemented() {
    console.log('not yet implemented');
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  openLogin() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '100vw',
      data: {}
    });
  }

}
