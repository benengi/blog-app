import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/article.model';
import { PagingService } from 'src/app/services/paging/paging.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/data/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  NUMBER_OF_ARTICLES_DISPLAYED = 3;

  featuredArticles: Article[];
  mainList: Article[];
  currentPage: Article[];
  currentLastArticle: any;
  user: User;

  constructor(
  private pagingService: PagingService,
  private router: Router,
  protected auth: AuthService) { }

  ngOnInit() {
    this.pagingService.firstPage(3).subscribe(articles => {
      this.featuredArticles = articles.map(article => ({ id: article.id, ...article.data() }));
      this.currentPage = this.featuredArticles;
      this.currentLastArticle = articles[articles.length - 1];
      this.getMainList();
    });

    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  edit(id: string) {
    id ? this.router.navigate(['edit', id]) : console.log('error!');
  }

  next() {
    this.getMainList();
  }

  navigateTo(id: string) {
    this.router.navigate(['articles', id]);
  }

  protected getMainList() {
    this.pagingService.nextPage(this.currentLastArticle, this.NUMBER_OF_ARTICLES_DISPLAYED).subscribe(articles => {
      this.currentLastArticle = articles[articles.length - 1];
      this.mainList = articles.map(article => ({ id: article.id, ...article.data() }));
      this.currentPage = this.mainList;
    });
  }

}
