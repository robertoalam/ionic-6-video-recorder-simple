import { Component, OnInit } from '@angular/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-capacitor',
  templateUrl: './capacitor.page.html',
  styleUrls: ['./capacitor.page.scss'],
})
export class CapacitorPage {

  constructor() { }

  async videoSelecionar(){
    const { Camera } = Plugins;
    const result = await Camera['getVideo']({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      CameraSource:CameraSource.Camera,
      quality: 100
    });

    const videoPath = result.path;
    console.log('Video path: ' + videoPath);
  }
}
