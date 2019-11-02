import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/login/login.component';

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
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {}
    });
  }

}
