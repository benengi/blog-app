import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initRegistrationForm();
  }

  register() {
    this.auth.register(this.registerForm.value.email, this.registerForm.value.password);
  }

  private initRegistrationForm() {
    this.registerForm = this.fb.group({
      email: '',
      password: '',
      repassword: ''
    });
  }

}
