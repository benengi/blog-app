import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Article } from 'src/app/data/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articlesCol: AngularFirestoreCollection<Article>;
  constructor(private afs: AngularFirestore) { }

  createArticle(article: Article) {
    return this.afs.collection('articles').add({...article});
  }

  updateArticle(article: Article) {
    return this.afs.doc<Article>(`articles/${article.id}`).update({...article});
  }
}
