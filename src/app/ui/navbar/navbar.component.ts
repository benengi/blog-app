import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/login/login.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  protected toggleSidebar() {
    const mainContent = document.getElementsByClassName('main-content')[0];
    const sidebar = document.getElementById('sidebar-content');

    mainContent.classList.toggle('opened');
    sidebar.classList.toggle('sidebar-opened');
  }

  protected openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      data: {}
    });
  }

}
