import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss();
  }

}
