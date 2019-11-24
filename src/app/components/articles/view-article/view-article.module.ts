import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewArticleComponent } from './view-article.component';
import { Routes, RouterModule } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

const routes: Routes = [
  { path: ':id', component: ViewArticleComponent },
];

@NgModule({
  declarations: [ViewArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiModule,
    PipesModule
  ]
})
export class ViewArticleModule { }
