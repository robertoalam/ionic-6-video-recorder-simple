import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { VideoService } from 'src/app/service/video.service';
import { Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
import * as WebVPPlugin from 'capacitor-video-player';
const { CapacitorVideoPlayer } = Plugins;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalPage  implements AfterViewInit {

  
  @ViewChild('video') captureElement!: ElementRef ;
  mediaRecorder: any;
  videoPlayer: any;
  isRecording = false;
  videos = [];

  constructor(
    private navParam:NavParams,
    private modalController:ModalController,
    private videoService:VideoService,
    private changeDetector: ChangeDetectorRef,

  ) { 
    console.log('PARAMS MODULO',this.navParam.get('modulo'))
    console.log('PARAMS OBJETO',this.navParam.get('objeto'))
  }

  ngAfterViewInit(){
    this.videoPlayer = (Capacitor.isNative) 
      ? CapacitorVideoPlayer
      : WebVPPlugin.CapacitorVideoPlayer

  }

  async recording(){
    
     // Create a stream of video capturing
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user'
      },
      audio: true
    })

    // Show the stream inside our video object
    this.captureElement.nativeElement.srcObject = stream;

    var options = {mimeType: 'video/webm'};
    this.mediaRecorder = new MediaRecorder(stream, options);
    let chunks:any = [];

    // Store the video on stop
    this.mediaRecorder.onstop = async (event:any) => {
      const videoBuffer = new Blob(chunks, { type: 'video/webm' });
      await this.videoService.storeVideo(videoBuffer);
      
      // Reload our list
      this.videos = this.videoService.videos;
      this.changeDetector.detectChanges();
    }

    // Store chunks of recorded video
    this.mediaRecorder.ondataavailable = (event:any) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data)
      }
    }

    // Start recording wth chunks of data
    this.mediaRecorder.start(100);
    this.isRecording = true;
  }


  stoping(){
    this.mediaRecorder.stop();
    this.mediaRecorder = null;
    this.captureElement.nativeElement.srcObject = null;
    this.isRecording = false;
  }
  ionViewCanLeave(){
    this.modalController.dismiss(null, 'cancel');
  }



  salvar(){

  }
}
