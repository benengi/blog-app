import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Article } from 'src/app/data/article.model';
import { skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  private articlesCol: AngularFirestoreCollection<Article>;

  constructor(private afs: AngularFirestore) {}

  firstPage(pageSize: number) {
    this.articlesCol = this.afs.collection('articles',
      ref => ref
      .orderBy('created', 'desc')
      .limit(pageSize)
    );

    return this.articlesCol.valueChanges({ idField: 'id' });
  }

  nextPage(lastId: string, pageSize: number) {
    const field = 'created';
    const last = this.articlesCol.doc<Article>(lastId);
    console.log(last);
    this.articlesCol = this.afs.collection('articles',
      ref => ref
      .orderBy(field, 'desc')
      .startAfter(last)
      .limit(pageSize)
    );

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
