import { NgModule } from '@angular/core';
import { FirestoreDatePipe } from './firestoreDate.pipe';

@NgModule({
  declarations: [FirestoreDatePipe],
  imports: [
  ],
  exports: [FirestoreDatePipe]
})
export class PipesModule { }
