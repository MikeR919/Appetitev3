import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Local, Sugerencia, User } from 'src/app/models';
import { AlertController, ToastController, LoadingController  } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  user$: Observable<User>=this.authSvc.auth.user;
  user:User;

  sugerencias: Sugerencia[] = [];

  nuevoLocal: Local = {
    Nombre: '',
    Descripcion: '',
    Direccion: '',
    openHours: '',
    OpenDays: '',
    imagen: '',
    //ubicacion: '',
    id:'',
    likes: null,
    //id: this.database.getId(),
    fechaCreacion: new Date()
  };

  private path = 'Locales/';
  private pathsug = 'Sugerencias/';
  loading:any;

  constructor(private menu: MenuController, 
    public database:FirestoreService,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private storageService: FirestorageService,
    public authSvc:FirebaseauthService,
    private router: Router
    ) { 
      this.authSvc.stateAuth().subscribe(res=>{
        if(res === null){
          this.router.navigate(['home']);
          
        }else{
          if (res.uid != 'xqdLNQILCaeJ6NQaaGrfb11FErd2') {
            this.router.navigate(['tabs']);
          }
        }
        console.log("usuario activo->",res.uid);
      });
  
    } 

  ngOnInit() { 

    this.getSugerencias();
  }

  openMenu() {
    this.menu.toggle('first');
  }

  async crearlocal() {
    this.presentLoading();
    const path = 'locales';
    const name = this.nuevoLocal.Nombre;
    const res = await this.storageService.uploadImage(this.newFile, path, name);
    this.nuevoLocal.imagen = res;
    //this.crearlocal();
    this.database.createDoc(this.nuevoLocal, this.path, this.nuevoLocal.id).then(res => {
      this.loading.dismiss();
      this.presentToast('Se ha crado con éxito');
    }).catch(error => {
      console.log(error);
      this.presentToast('Ocurrió un error al crear el local');
    });

  }

  newImage = '';
  newFile = '';

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;

      });
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  getSugerencias() {
    try{
    this.database.getCollection<Sugerencia>(this.pathsug).subscribe(res => {
      this.sugerencias = res;
    });}catch(error){
      console.log('error->', error);
    }
  }

  async eliminarSugerencia(oportunidad: Sugerencia) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      message: '¿Seguro que deseas <strong>eliminar</strong> la sugerencia?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sí',
          handler: () => {
            console.log('Confirm Okay');
            this.database.deleteDoc(this.pathsug, oportunidad.id).then(res => {
              this.presentToast('Se ha eliminado la sugerencia');
              this.alertController.dismiss();
            }).catch(error => {
              console.log(error);
              this.presentToast('Ocurrió un error al eliminar la sugerencia');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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

  async logOut(){
    await this.authSvc.logout();
    this.router.navigate(['home']);
  }

  getUserInfo(uid:string){
    const path ='users';
    this.database.getDoc(path,uid).subscribe(res =>{
      console.log(res);
    });
  }
  
}
