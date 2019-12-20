import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Article } from 'src/app/data/article.model';
import { skip, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  private articlesCol: AngularFirestoreCollection<Article>;

  constructor(private afs: AngularFirestore) {}

  firstPage(pageSize: number): Observable<any> {
    this.articlesCol = this.afs.collection('articles',
      ref => ref
      .orderBy('created', 'desc')
      .limit(pageSize)
    );

    // return this.articlesCol.valueChanges({ idField: 'id' });
    return this.articlesCol.snapshotChanges().pipe(
      map(articles => articles.map(item => item.payload.doc))
    );
  }

  nextPage(last: any, pageSize: number) {
    const NUM_OF_FEATURED_OF_ARTICLES = 3;
    this.articlesCol = this.afs.collection('articles',
      ref => ref
      .orderBy('created', 'desc')
      .startAfter(last)
      .limit(pageSize)
    );
    console.log('next');
    return this.articlesCol.valueChanges({ idField: 'id' });
  }

  prevPage(first: AngularFirestoreDocument, pageSize: number) {
    this.articlesCol = this.afs.collection('articles',
      ref => ref
      .orderBy('created', 'desc')
      .endBefore(first)
      .limit(pageSize)
    );

    return this.articlesCol.valueChanges({ idField: 'id' });
  }
}
