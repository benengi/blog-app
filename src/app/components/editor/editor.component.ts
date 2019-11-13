import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
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
  user: User;

  constructor(
    private auth: AuthService,
    private articleService: ArticlesService) {
    this.titleEditor = new EditorJS({
      holderId: 'title',
      autofocus: true,
      placeholder: 'Add a Title',
      tools: {
        header: Header
      },
      initialBlock: 'header'
    });

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

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  initEditor() {
  }

  save() {
    /*
    * Saving Rules
    * x(1) First Block should be a Title block somehow
    * (2) Save the Article as-is using JSON
    * (3) Created Date is set Date won't change ever
    * (4) Updated Date is always, well, updated
    * (5) Author is same as uid unless Manually change on DB (for now)
    */

    this.titleEditor.save().then((titleData) => {
      // @ts-ignore
      const name = titleData.blocks[0].data.text;
      console.log(name);
      this.editor.save().then((outputData) => {
        console.log(outputData);

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
        );
      });
    });
  }

}
