import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }

  login() {
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password);
  }

  googleAuth() {
    this.auth.googleSignin();
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });
  }

}
