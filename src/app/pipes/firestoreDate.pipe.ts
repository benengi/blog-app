import { Pipe, PipeTransform } from '@angular/core';
import { firestore } from 'firebase';

@Pipe({name: 'firestoreDate'})
export class FirestoreDatePipe implements PipeTransform {
  transform(timestamp: firestore.Timestamp) {
    if (!timestamp) {
      return '';
    }

    const date = timestamp.toDate();
    const convertedTimeStamp = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

    return convertedTimeStamp;
  }
}
