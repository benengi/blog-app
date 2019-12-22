import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from 'src/app/data/message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private afs: AngularFirestore) { }

  sendMessage(message: Message): Promise<any> {
    const messageCollection: AngularFirestoreCollection<Message> = this.afs.collection('messages');
    return messageCollection.add({
      ...message
    });
  }
}
