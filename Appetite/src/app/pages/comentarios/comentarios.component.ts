import { FirestoreService } from './../../services/firestore.service';
import { Comentario, Local } from 'src/app/models';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {

  @Input() local: Local;

  comentario = '';

  comentarios:Comentario []=[];

  constructor(public modalController: ModalController,
    public authSvc: FirebaseauthService,
    public firebase: FirestoreService) { }

  user$: Observable<User> = this.authSvc.auth.user;

  user:User;

  autor='';
  photo='';

  async ngOnInit() {
    this.authSvc.stateAuth().subscribe(res=>{
      if(res != null){
        this.autor=res.displayName;
        this.photo=res.photoURL;
      }
    });

    this.loadComentarios();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  loadComentarios(){
    let startAt= null;
    if (this.comentarios.length){
      startAt=this.comentarios[this.comentarios.length-1].fecha
    }
    const path = 'Locales/' + this.local.id + '/comentarios';
    this.firebase.getCollectionPaginada<Comentario>(path, 200).subscribe (res => {
      if(res.length){
        this.comentarios=res;
      }      
    });
  }

  comentar() {
    const comentario = this.comentario;
    console.log("El comentario es ", comentario);
    const path = 'Locales/' + this.local.id + '/comentarios';
    const data: Comentario = {
      autor:this.autor,
      foto:this.photo,
      comentario, //se pone una sola linea pues es la misma variable
      fecha: new Date(),
      id:this.firebase.getId()
    }

    this.firebase.createDoc(data,path,data.id).then(()=>{
      console.log('Comentario Enviado');
    });

    this.comentario = '';
  }

}
