import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../services/firestore.service';
import { Sugerencia } from 'src/app/models';
import { AlertController, ToastController, LoadingController, MenuController  } from '@ionic/angular';

@Component({
  selector: 'app-sugerir',
  templateUrl: './sugerir.component.html',
  styleUrls: ['./sugerir.component.scss'],
})
export class SugerirComponent implements OnInit {

  nuevaSugerencia: Sugerencia = {
    Nombre: '',
    Descripcion: '',
    Direccion: '',
    openHours: '',
    OpenDays: '',
    id: this.database.getId(),
    fechaCreacion: new Date()
  };

  private path = 'Sugerencias/'
  loading: any;

  constructor(
    public database: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController) { }

  ngOnInit() {}

  crearSugerencia() {
    this.presentLoading();
    this.database.createDoc(this.nuevaSugerencia, this.path, this.nuevaSugerencia.id).then(res => {
      this.loading.dismiss();
      this.presentToast('Su solicitud será procesada');
    }).catch(error => {
      console.log(error);
      this.presentToast('No se pudo generar su solicitud');
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'procesando petición',
    });
    await this.loading.present();
    //await loading.onDidDismiss();
    //console.log('Loading dismissed!');
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


}
