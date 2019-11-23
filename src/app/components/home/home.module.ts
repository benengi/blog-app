import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FirestoreDatePipe } from 'src/app/pipes/firestoreDate.pipe';

@NgModule({
  declarations: [HomeComponent, FirestoreDatePipe],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
