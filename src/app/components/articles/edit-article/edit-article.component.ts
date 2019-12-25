import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article, Block } from 'src/app/data/article.model';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
// Editor JS
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit, AfterViewInit {
  editor: EditorJS;
  titleEditor: EditorJS;

  article: Article;
  isLoading = true;

  isSaving = false;

  id: string;

  constructor(
    public activeRoute: ActivatedRoute,
    private auth: AuthService,
    private articleService: ArticlesService,
    private router: Router,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getArticle().subscribe(article => {
      this.isLoading = false;
      this.article = article;
      this.initBodyEditor(article.post);
      this.initTitleEditor(article.title);
    });
  }

  ngAfterViewInit() {
  }

  save() {
    this.isSaving = true;
    this.titleEditor.save().then((titleData) => {
      // @ts-ignore
      const name = titleData.blocks[0].data.text;
      this.editor.save().then((outputData) => {
          this.articleService.updateArticle(this.id,
            {
              title: name,
              post: outputData.blocks,
              created: new Date(titleData.time),
              updated: new Date(titleData.time)
            }
          ).then(() => {
            this.isSaving = false;
            this.router.navigate(['articles', this.id]);
          });
      });
    });
  }

  private getArticle(): Observable<Article> {
    return this.articleService.getArticle(this.id);
  }

  private initTitleEditor(text?: string) {
    this.titleEditor = new EditorJS({
      holderId: 'title',
      autofocus: true,
      placeholder: 'Add a Title',
      tools: {
        header: Header
      },
      data: {
        blocks: [
          {
            type: 'header',
            data: {
              text
            }
          }
        ]
      },
      initialBlock: 'header'
    });
  }

  private initBodyEditor(posts?: Block[]) {
    const postBody = posts.map(post => ({type: 'paragraph', data: { text: post.data.text }}));
    this.editor = new EditorJS({
      holderId: 'body',
      tools: {
        header: {
          class: Header,
          shortcut: 'CMD+SHIFT+H',
          inlineToolbar: ['link']
        },
        list: {
          class: List,
          inlineToolbar: [
            'link',
            'bold'
          ]
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true
            }
          }
        }
      },
      data: {
        blocks: postBody
      },
    });
  }

}
