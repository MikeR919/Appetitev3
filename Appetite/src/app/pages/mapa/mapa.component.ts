import { Component,OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from "@capacitor/core";
import { Local } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

// declare var google;

// interface Marker {
//   position: {
//     lat: number,
//     lng: number,
//   };
//   title: string;
// }

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() local: Local;

  private latitud=0;
  private longitud=0;
  position={}
  label={}

  title='gmaps';

  

  //@Input() local: Local;


  // private lat_user = 0;
  // private lng_user = 0;

  // map = null;
  // markers: Marker[] = [
  //   {
  //     position: {
  //       lat: this.lat_user,
  //       lng: this.lng_user,
  //     },
  //     title: 'Mi location'
  //   },
  // ];

  constructor(public modalController: ModalController,
    public firebase: FirestoreService) { }

  ngOnInit() {
    this.printMap();
  }

  printMap(){
    const posision= {lat: this.local.ubicacion._lat, lng: this.local.ubicacion._long}
    this.latitud=posision.lat;
    this.longitud=posision.lng;
    this.position={
      lat: this.latitud,
      lng: this.longitud
    };
    this.label = {
      text: this.local.Nombre
    }
  }
  
  closeModal() {
    this.modalController.dismiss();
  }


  
}

 

  // loadMap(lat:number, lng:number) {
  //   // create a new map by passing HTMLElement
  //   const mapEle: HTMLElement = document.getElementById('map');
  //   // create LatLng object
  //   const myLatLng = {lat: lat, lng: lng};
  //   // create map
  //   this.map = new google.maps.Map(mapEle, {
  //     center: myLatLng,
  //     zoom: 12
  //   });

  //   google.maps.event.addListenerOnce(this.map, 'idle', () => {
  //     this.renderMarkers();
  //     mapEle.classList.add('show-map');
  //   });
  // }

  // renderMarkers() {
  //   this.markers.forEach(marker => {
  //     this.addMarker(marker);
  //   });
  // }

  // addMarker(marker: Marker) {
  //   return new google.maps.Marker({
  //     position: marker.position,
  //     map: this.map,
  //     title: marker.title
  //   });
  // }

  // async obtnerCoordenadas(){
  //   const obtnerCoordenadas = await Geolocation.getCurrentPosition();
  //   this.lat_user = obtnerCoordenadas.coords.latitude;
  //   this.lng_user = obtnerCoordenadas.coords.longitude;
  //   this.loadMap(this.lat_user,this.lng_user);

  // }
