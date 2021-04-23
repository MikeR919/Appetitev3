import { IonicModule } from '@ionic/angular';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class BackendModule { }
