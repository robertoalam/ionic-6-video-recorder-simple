import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { VideoService } from 'src/app/service/video.service';
import { Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
import * as WebVPPlugin from 'capacitor-video-player';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
const { CapacitorVideoPlayer } = Plugins;
import { ModalPage } from './modal/modal.component';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.page.html',
  styleUrls: ['./navigator.page.scss'],
})
export class NavigatorPage  implements AfterViewInit {

  @ViewChild('video') captureElement!: ElementRef ;
  mediaRecorder: any;
  videoPlayer: any;
  isRecording = false;
  videos = [];

  constructor(
    private platform: Platform,
    private modalController:ModalController,
    private videoService:VideoService,
    private navCtrl:NavController,
  ) {
    
  }

  async ngAfterViewInit() {
    this.videos = await this.videoService.loadVideos();
    // if (Capacitor.isNative) {
    //   this.videoPlayer = CapacitorVideoPlayer;
    // } else {
    //   this.videoPlayer = WebVPPlugin.CapacitorVideoPlayer
    // }
  }

  async imagemSelecionar(){
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing:false,
      resultType:CameraResultType.Uri,
      source:CameraSource.Photos
    })
    //if( image ) { this.saveImage(image) }
  }

  async photoSelecionar(){
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing:false,
      resultType:CameraResultType.Uri,
      source:CameraSource.Camera
    })
    //if( image ) { this.saveImage(image) }
  }


  async modalOpen(modulo : string , objeto:any){
    let modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        modulo:modulo,
        objeto:objeto
      }
    });
    modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (data) {
      console.log('DATA ',data)
    }
  }

  voltar(){
    this.navCtrl.pop();
  }
}