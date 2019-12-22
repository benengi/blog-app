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
import { Article } from 'src/app/data/article.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  editor: EditorJS;
  titleEditor: EditorJS;

  editorForm: FormGroup;
  editorStyle = {
    height: '10rem'
  };

  /* Firestore Image Upload Variables */
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  // Path to the img URL
  imgPath: string;

  // User and Loading
  user: User;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private articleService: ArticlesService,
    private router: Router,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.initTitleEditor();
    this.editorForm = this.fb.group({
      editor: new FormControl()
    });

    this.auth.user$.subscribe(user => {
      this.user = user;
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
    this.imgPath = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(this.imgPath, file, { customMetadata });

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
    // this.isSaving = true;
    /* this.articleService.createArticle(
      {
        uid: this.user.uid,
        author: this.user.displayName,
        title: name,
        post: outputData.blocks,
        created: new Date(titleData.time),
        updated: new Date(titleData.time),
        photoURL: url
      }
    ).then((docRef) => {
      this.isSaving = false;
      this.router.navigate(['articles', docRef.id]);
    }); */
    console.log(this.editorForm.value);
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

}
