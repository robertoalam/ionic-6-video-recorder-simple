import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavigatorPageRoutingModule } from './navigator-routing.module';

import { NavigatorPage } from './navigator.page';
import { ModalPage } from './modal/modal.component';
import { VideoService } from 'src/app/service/video.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavigatorPageRoutingModule
  ],
  declarations: [NavigatorPage,ModalPage],
  providers:[VideoService]
})
export class NavigatorPageModule {}
