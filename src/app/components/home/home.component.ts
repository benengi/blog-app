import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/article.model';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredArticles: Article[];

  constructor(
    private articlesService: ArticlesService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.articlesService.getLatestArticles(3).subscribe(articles => {
      this.featuredArticles = articles;
      console.log(this.featuredArticles);
    });
  }

}
