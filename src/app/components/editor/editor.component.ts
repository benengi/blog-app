import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';
import ImageTool from '@editorjs/image';

import { ArticlesService } from 'src/app/services/articles/articles.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/data/user.model';

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
    private articleService: ArticlesService) {
      this.initTitleEditor();
      this.initBodyEditor();
      this.initPhotoURLEditor();
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
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
            id: '',
            uid: this.user.uid,
            author: this.user.displayName,
            title: name,
            post: outputData.blocks,
            created: new Date(titleData.time),
            updated: new Date(titleData.time)
          }
        ).then(() => {
          this.isSaving = false;
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
          class: ImageTool
        }
      },
      initialBlock: 'image'
    });
  }
}
