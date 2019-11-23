import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Article } from 'src/app/data/article.model';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articlesCol: AngularFirestoreCollection<Article>;
  constructor(private afs: AngularFirestore) {}

  createArticle(article: Article) {
    return this.afs.collection('articles').add({...article});
  }

  getLatestArticles(numOfArticles: number): Observable<Article[]> {
    this.articlesCol = this.afs.collection('articles',
      ref => ref
      .orderBy('created', 'desc')
      .limit(numOfArticles)
    );

    return this.articlesCol.valueChanges({ id: 'id' });
  }

  getArticle(id: string) {
    this.articlesCol = this.afs.collection('articles');
    return id ? this.articlesCol.doc<Article>(id).valueChanges().pipe(
      map(article => article ? article : null)
    ) : of(null);
  }

  updateArticle(id: string, article: Article) {
    return this.afs.doc<Article>(`articles/${id}`).update({...article});
  }
}
