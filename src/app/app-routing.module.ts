import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  /*{ path: '',
    loadChildren: './components/auth/auth.module#AuthModule'
  },*/
  { path: '', component: HomeComponent },
  {
    path: 'editor',
    loadChildren: './components/editor/editor.module#EditorModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
