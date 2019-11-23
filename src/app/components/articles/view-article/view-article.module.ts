import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewArticleComponent } from './view-article.component';
import { Routes, RouterModule } from '@angular/router';
import { FirestoreDatePipe } from 'src/app/pipes/firestoreDate.pipe';
import { UiModule } from 'src/app/ui/ui.module';

const routes: Routes = [
  { path: ':id', component: ViewArticleComponent },
];

@NgModule({
  declarations: [ViewArticleComponent, FirestoreDatePipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiModule
  ]
})
export class ViewArticleModule { }
