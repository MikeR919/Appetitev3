import { Component, Input, OnInit } from '@angular/core';
import { Local } from 'src/app/models';
import { ModalController } from '@ionic/angular';
import { ComentariosComponent } from 'src/app/pages/comentarios/comentarios.component';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models';
import { MapaComponent } from 'src/app/pages/mapa/mapa.component';



@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss'],
})
export class LocalesComponent implements OnInit {

  @Input() local: Local;
  idlocal='';

  constructor(public modalController: ModalController,
    public authSvc: FirebaseauthService,
    public firebase: FirestoreService) {
      
    }

  user: User;
  autor = '';
  idUser = '';
  
  tooglehearth:string;

  async ngOnInit() {
    this.authSvc.stateAuth().subscribe(res => {
      if (res != null) {
        this.autor = res.displayName;
        this.idUser = res.uid;
      }
      const corazon = this.local.likes.indexOf(this.idUser);
    if (corazon == -1) {
      this.tooglehearth="heart-outline"
    }
    else {
      this.tooglehearth="heart"
    }
    });
  }

  

  async presentModal() {
    const modal = await this.modalController.create({
      component: ComentariosComponent,
      cssClass: 'my-custom-class',
      componentProps: { local: this.local }
    });
    return await modal.present();
  }

  async mapa() {
    const modal = await this.modalController.create({
      component: MapaComponent,
      cssClass: 'my-custom-class',
      componentProps: { local: this.local }
    });
    return await modal.present();
  }



  toogleLike() {
    const corazon = this.local.likes.indexOf(this.idUser);
    if (corazon == -1) {
      this.darMegusta();
    }
    else {
      this.quitarMegusta();
    }

  }

  darMegusta() {
    const path = 'Locales/';
    this.local.likes.push(this.idUser);
    this.firebase.updateDoc(this.local, path, this.local.id);
  }

  quitarMegusta() {
    const path = 'Locales/';
    const eliminar = this.local.likes.indexOf(this.idUser);
    this.local.likes.splice(eliminar, 1);
    this.firebase.updateDoc(this.local, path, this.local.id);
  }

  mostrarLikes() {
    console.log('El local es: ->', this.local.Nombre, 'y tiene:', this.local.likes);
  }

}
