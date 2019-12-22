import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { User } from 'src/app/data/user.model';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user: User;
  constructor(
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
  }

  protected toggleSidebar() {
    const mainContent = document.getElementsByClassName('main-content')[0];
    const sidebar = document.getElementById('sidebar-content');

    mainContent.classList.toggle('opened');
    sidebar.classList.toggle('sidebar-opened');
  }

  protected openLogin() {
    const dialogRef = this.dialog.open(AuthComponent, {
      data: {}
    });
  }

  protected navigateToHome() {
    this.router.navigateByUrl('');
  }

  protected navigateToEditor() {
    this.router.navigateByUrl('new');
  }

  protected navigateToContact() {
    this.router.navigateByUrl('contact-us');
  }

}
