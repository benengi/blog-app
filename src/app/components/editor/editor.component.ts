import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editor: EditorJS;
  titleEditor: EditorJS;

  constructor() {
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
      },
    });
  }

  ngOnInit() {
  }

  initEditor() {
  }

  save() {
    /*
    * Saving Rules
    * (1) First Block should be a Title block somehow
    * (2) Save the Article as-is using JSON
    * (3) Created Date is set Date won't change ever
    * (4) Updated Date is always, well, updated
    * (5) Author is same as uid unless Manually change on DB (for now)
    */
    this.editor.save().then((outputData) => {
      console.log(outputData);
    });
  }

}
