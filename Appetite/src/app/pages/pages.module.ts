import { ComentariosComponent } from './comentarios/comentarios.component';
import { SugerirComponent } from './sugerir/sugerir.component';
import { MapaComponent } from './mapa/mapa.component';
import { ListaComponent } from './lista/lista.component';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HomeComponent,
    ListaComponent,
    MapaComponent,
    SugerirComponent,
    ComentariosComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents:[
    ComentariosComponent
  ]
})
export class PagesModule { }
