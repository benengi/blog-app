import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './edit-article.component';
import { Routes, RouterModule } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';
import { FirestoreDatePipe } from 'src/app/pipes/firestoreDate.pipe';

const routes: Routes = [
  { path: ':id', component: EditArticleComponent },
];

@NgModule({
  declarations: [EditArticleComponent, FirestoreDatePipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiModule
  ]
})
export class EditArticleModule { }
