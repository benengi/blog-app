import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ArticleListComponent } from './article-list/article-list.component';

@NgModule({
  declarations: [HomeComponent, ArticleListComponent],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class HomeModule { }
