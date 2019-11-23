import { Component, OnInit } from '@angular/core';
// Editor JS
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/data/user.model';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  editor: EditorJS;
  titleEditor: EditorJS;

  /* Firestore Image Upload Variables */
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;

  // User and Loading
  user: User;
  isSaving = false;

  constructor(
    private auth: AuthService,
    private articleService: ArticlesService,
    private router: Router,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.initTitleEditor();
      this.initBodyEditor();
      // this.initPhotoURLEditor();
    });
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges();

    // The file's download URL
    // this.downloadURL = this.task.downloadURL();
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
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
          this.router.navigate(['articles', docRef.id]);
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
      }
    });
  }

}
