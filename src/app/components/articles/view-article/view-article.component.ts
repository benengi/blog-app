import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/article.model';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {

  article: Article;
  isLoading = true;

  constructor(
    public activeRoute: ActivatedRoute,
    private articleService: ArticlesService,
    private storage: AngularFireStorage
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
