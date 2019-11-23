import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewArticleComponent } from './new-article.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { UiModule } from 'src/app/ui/ui.module';

const routes: Routes = [
  { path: '', component: NewArticleComponent },
];

@NgModule({
  declarations: [NewArticleComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UiModule,
    RouterModule.forChild(routes)
  ]
})
export class NewArticleModule { }
