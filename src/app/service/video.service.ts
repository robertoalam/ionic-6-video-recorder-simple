import { ChangeDetectorRef, ElementRef, Injectable, ViewChild } from '@angular/core';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({ providedIn: 'root' })
export class VideoService {

  @ViewChild('video') captureElement!: ElementRef;
  mediaRecorder: any;
  videoPlayer: any;
  isRecording = false;
  videos:any = [];

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  
  async loadVideos() {
    // const videoList = await Storage.get({ key: this.VIDEOS_KEY });
    const videoList = await Storage['get']
    this.videos = JSON.parse(videoList.value) || [];
    return this.videos;
  }

  async storeVideo(blob : any) {
    const fileName = new Date().getTime() + '.mp4';
    const base64Data = await this.convertBlobToBase64(blob) as string;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    // Add file to local array
    this.videos.unshift(savedFile.uri);

    // Write information to storage
    return ;
    // return Storage.set({
    //   key: this.VIDEOS_KEY,
    //   value: JSON.stringify(this.videos)
    // });
  }

  // Helper function
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  // Load video as base64 from url
  async getVideoUrl(fullPath : any) {
    const path = fullPath.substr(fullPath.lastIndexOf('/') + 1);
    const file = await Filesystem.readFile({
      path: path,
      directory: FilesystemDirectory.Data
    });
    return `data:video/mp4;base64,${file.data}`;
  }
}
