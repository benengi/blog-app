import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    AuthComponent
  ],
  entryComponents: [AuthComponent]
})
export class AuthModule { }
