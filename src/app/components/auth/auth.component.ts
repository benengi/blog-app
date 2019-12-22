import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    public auth: AuthService) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
