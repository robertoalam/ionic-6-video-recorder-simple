import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { VideoService } from 'src/app/service/video.service';
import { Capacitor } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
import * as WebVPPlugin from 'capacitor-video-player';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
const { CapacitorVideoPlayer } = Plugins;

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.page.html',
  styleUrls: ['./navigator.page.scss'],
  providers:[VideoService]
})
export class NavigatorPage  implements AfterViewInit {

  images : LocalFile[] = [];
  @ViewChild('video') captureElement!: ElementRef ;
  mediaRecorder: any;
  videoPlayer: any;
  isRecording = false;
  videos = [];

  constructor(
    private platform: Platform,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private http: HttpClient,    
    private videoService:VideoService,
    private changeDetector: ChangeDetectorRef,

  ) {
    
  }

  ngAfterViewInit() {
    if (Capacitor.isNative) {
      this.videoPlayer = CapacitorVideoPlayer;
    } else {
      this.videoPlayer = WebVPPlugin.CapacitorVideoPlayer
    }

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

  async videoSelecionar(){

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
  
}

interface LocalFile{
  name:string;
  path:string;
  data:string;
}