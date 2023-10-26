import { Component, OnInit } from '@angular/core';
import { CaptureVideoOptions, MediaCapture } from '@awesome-cordova-plugins/media-capture/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
@Component({
  selector: 'app-awesome',
  templateUrl: './awesome.page.html',
  styleUrls: ['./awesome.page.scss'],
  
})
export class AwesomePage {

  isRecording:boolean = true

  constructor() { }

  async videoSelecionar(){

    // let mediaCapture = new MediaCapture;
    // try {
    //   const opt: CaptureVideoOptions = { limit: 1 };
    //   const data = await mediaCapture.captureVideo(opt);
    // } catch (e) {
    //   console.log('TESTE')
    //   console.error(e, "video capture error");
    // }
  }
}
