import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComentariosComponent } from '../comentarios/comentarios.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async presentModal() {
    console.log('estoy dando click');
    const modal = await this.modalController.create({
      component: ComentariosComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
