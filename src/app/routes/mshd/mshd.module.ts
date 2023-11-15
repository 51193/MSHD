import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MshdRoutingModule } from './mshd-routing.module';
import { MshdComponent } from './mshd.component';
import { HomeComponent } from './pages/home/home.component';
import { VisualizationComponent } from './pages/visualization/visualization.component';
import { CodesComponent } from './pages/codes/codes.component';
import { UploadComponent } from './pages/upload/upload.component';
import { MapComponent } from './pages/map/map.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {FormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";

@NgModule({
  declarations: [
    MshdComponent,
    HomeComponent,
    VisualizationComponent,
    CodesComponent,
    UploadComponent,
    MapComponent,
  ],
  imports: [CommonModule, MshdRoutingModule, SharedModule, FormsModule, NzDatePickerModule, NzTimePickerModule, FormsModule],
})
export class MshdModule {}
