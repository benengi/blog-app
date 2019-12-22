import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ContactService } from 'src/app/services/contact/contact.service';
import { Message } from 'src/app/data/message.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  isSending = false;

  constructor(private fb: FormBuilder, private contact: ContactService) { }

  ngOnInit() {
    this.initContactForm();
  }

  submitForm() {
    this.isSending = true;

    this.contactForm = this.fb.group({
      name: new FormControl({ value: this.contactForm.value.name, disabled: this.isSending }),
      email: new FormControl({ value: this.contactForm.value.email, disabled: this.isSending }),
      message: new FormControl({ value: this.contactForm.value.message, disabled: this.isSending })
    });

    const message: Message = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    this.contact.sendMessage(message).then(() => {
      this.initContactForm();
      this.isSending = false;
    });
  }

  private initContactForm() {
    this.contactForm = this.fb.group({
      name: '',
      email: '',
      message: ''
    });
  }

}
