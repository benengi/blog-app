import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  protected toggleSidebar() {
    const sidebar = document.getElementById('sidebar-content');
    console.log(sidebar);
    sidebar.classList.toggle('sidebar-opened');
  }

}
