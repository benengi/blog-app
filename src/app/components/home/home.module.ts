import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [HomeComponent, ArticleListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule
  ]
})
export class HomeModule { }
