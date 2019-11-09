import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewChecked {

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    protected auth: AuthService) { }

  ngOnInit() {
    // document.getElementById('close-btn').style.top = '0';
  }

  ngAfterViewChecked() {
    /* const windowHeight = window.outerHeight;
    const dialogHeight = document.getElementsByClassName('mat-dialog-container')[0].clientHeight;
    const top = ((windowHeight - dialogHeight) / 2) - 42;
    document.getElementById('close-btn').style.top = top + 'px'; */
  }

  close() {
    this.dialogRef.close();
  }

}
