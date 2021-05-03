import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalesComponent } from './locales/locales.component';



@NgModule({
  declarations: [
    LocalesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ], exports:[
    LocalesComponent
]
})
export class ComponentesModule { }
