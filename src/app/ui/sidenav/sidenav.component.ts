import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from 'src/app/components/auth/auth.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ui-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  protected openLogin() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '250px',
      data: {}
    });
  }

}
