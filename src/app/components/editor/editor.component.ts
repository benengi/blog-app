import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';

import { ArticlesService } from 'src/app/services/articles/articles.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/data/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editor: EditorJS;
  titleEditor: EditorJS;
  photoEditor: EditorJS;
  user: User;
  isSaving = false;

  constructor(
    private auth: AuthService,
    private articleService: ArticlesService,
    private router: Router) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.initTitleEditor();
      this.initBodyEditor();
      this.initPhotoURLEditor();
    });
  }

  initEditor() {
  }

  save() {
    this.isSaving = true;
    this.titleEditor.save().then((titleData) => {
      // @ts-ignore
      const name = titleData.blocks[0].data.text;
      this.editor.save().then((outputData) => {
        this.articleService.createArticle(
          {
            uid: this.user.uid,
            author: this.user.displayName,
            title: name,
            post: outputData.blocks,
            created: new Date(titleData.time),
            updated: new Date(titleData.time)
          }
        ).then((docRef) => {
          this.isSaving = false;
          this.router.navigate(['edit-article', docRef.id]);
        });
      });
    });
  }

  private initTitleEditor() {
    this.titleEditor = new EditorJS({
      holderId: 'title',
      autofocus: true,
      placeholder: 'Add a Title',
      tools: {
        header: Header
      },
      initialBlock: 'header'
    });
  }

  private initBodyEditor() {
    this.editor = new EditorJS({
      holderId: 'editorjs',
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
      }
    });
  }

  private initPhotoURLEditor() {
    this.photoEditor = new EditorJS({
      holderId: 'photo',
      tools: {
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: environment.firebase.storageBucket
            }
          }
        }
      },
      initialBlock: 'image'
    });
  }
}
