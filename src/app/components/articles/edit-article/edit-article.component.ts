import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/data/article.model';
import { ArticlesService } from 'src/app/services/articles/articles.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  article: Article;
  isLoading = true;

  constructor(
    public activeRoute: ActivatedRoute,
    private articleService: ArticlesService
  ) { }

  ngOnInit() {
    this.getArticle().subscribe(article => {
      this.isLoading = false;
      this.article = article;
    });
  }

  private getArticle(): Observable<Article> {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    return this.articleService.getArticle(id);
  }

}
