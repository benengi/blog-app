import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/article.model';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { PagingService } from 'src/app/services/paging/paging.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredArticles: Article[];
  mainList: Article[];
  currentPage: Article[];

  constructor(
  private pagingService: PagingService) { }

  ngOnInit() {
    this.pagingService.firstPage(3).subscribe(articles => {
      console.log(articles);
      this.featuredArticles = articles.map(article => article.data());
      this.currentPage = this.featuredArticles;
      this.getMainList(articles[articles.length - 1]);
    });
  }

  protected getMainList(article) {
    this.pagingService.nextPage(article, 5).subscribe(articles => {
      this.mainList = articles;
      this.currentPage = this.mainList;
      console.log(this.mainList);
    });
  }

}
