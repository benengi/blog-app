import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './edit-article.component';
import { Routes, RouterModule } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  { path: ':id', component: EditArticleComponent },
];

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    UiModule,
    PipesModule
  ]
})
export class EditArticleModule { }
