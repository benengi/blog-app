import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { UiModule } from 'src/app/ui/ui.module';

const routes: Routes = [
  { path: '', component: EditorComponent },
];

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UiModule,
    RouterModule.forChild(routes)
  ]
})
export class EditorModule { }
