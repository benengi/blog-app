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

  constructor(
  private pagingService: PagingService) { }

  ngOnInit() {
    this.pagingService.firstPage(3).subscribe(articles => {
      this.featuredArticles = articles;
      console.log(this.featuredArticles);
      this.getMainList(this.featuredArticles[this.featuredArticles.length - 1].id);
    });
  }

  protected getMainList(id: string) {
    this.pagingService.nextPage(id, 5).subscribe(articles => {
      this.mainList = articles;
    });
  }

}
