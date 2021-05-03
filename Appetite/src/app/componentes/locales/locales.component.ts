
import { Component, Input, OnInit } from '@angular/core';
import { Local } from 'src/app/models';
import { ModalController } from '@ionic/angular';
import { ComentariosComponent } from 'src/app/pages/comentarios/comentarios.component';


@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss'],
})
export class LocalesComponent implements OnInit {

  @Input()local: Local;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ComentariosComponent,
      cssClass: 'my-custom-class',
      componentProps:{local: this.local}
    });
    return await modal.present();
  }

}
