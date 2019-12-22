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
    console.log(last);
    this.articlesCol = this.afs.collection('articles',
      ref => ref
      .orderBy('created', 'desc')
      .startAfter(last)
      .limit(pageSize)
    );
    // return this.articlesCol.valueChanges({ idField: 'id' });
    return this.articlesCol.snapshotChanges().pipe(
      map(articles => articles.map(item => item.payload.doc))
    );
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
