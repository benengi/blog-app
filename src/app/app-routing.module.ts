import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'new',
    loadChildren: './components/articles/new-article/new-article.module#NewArticleModule'
  },
  {
    path: 'edit',
    loadChildren: './components/articles/edit-article/edit-article.module#EditArticleModule'
  },
  {
    path: 'articles',
    loadChildren: './components/articles/view-article/view-article.module#ViewArticleModule'
  },
  {
    path: 'contact-us',
    loadChildren: './components/contact/contact.module#ContactModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
