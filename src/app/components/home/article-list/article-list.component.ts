import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { Article } from 'src/app/data/article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  @Input() articles: Article[];
  constructor(
    private articlesService: ArticlesService,
    private router: Router) { }

  ngOnInit() {
  }

  navigateTo(id: string) {
    this.router.navigate(['articles', id]);
  }

}
