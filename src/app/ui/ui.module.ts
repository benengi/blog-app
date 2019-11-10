import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [NavbarComponent, SidenavComponent, SpinnerComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    SidenavComponent,
    SpinnerComponent
  ]
})
export class UiModule { }
