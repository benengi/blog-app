import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'editor',
    loadChildren: './components/editor/editor.module#EditorModule'
  },
  {
    path: 'edit-article',
    loadChildren: './components/articles/edit-article/edit-article.module#EditArticleModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
