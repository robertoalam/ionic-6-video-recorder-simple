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
  objeto:any = null;
  flagPlaying:boolean=true;
  realUrl:any;

  constructor(
    private navParam:NavParams,
    private modalController:ModalController,
    private videoService:VideoService,
    private changeDetector: ChangeDetectorRef,

  ) { 
    this.objeto = this.navParam.get('objeto')
    this.flagPlaying = (this.objeto)?true:false;
  }

  ngAfterViewInit(){
    this.videoPlayer = (Capacitor.isNative) 
      ? CapacitorVideoPlayer
      : WebVPPlugin.CapacitorVideoPlayer
    
    if(this.flagPlaying){
      this.playing2();
    }
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

  async playing() {
    let video = this.objeto
    // Get the video as base64 data
    // this.realUrl = await this.videoService.getVideoUrl(video);
    this.realUrl = await this.videoService.getVideoUrl(video);

    // Show the player fullscreen
    await this.videoPlayer.initPlayer({
      mode: 'fullscreen',
      url: this.realUrl,
      playerId: 'fullscreen',
      componentTag: 'app-home'
    });    
  }

  
  async playing2() {
    
    let video = this.captureElement.nativeElement
    // Get the video as base64 data
    this.realUrl = await this.videoService.getVideoUrl(this.objeto);
    video.setAttribute('src',this.realUrl)
    video.play();
  }

  ionViewCanLeave(){
    this.modalController.dismiss(null, 'cancel');
  }
  salvar(){

  }
}
