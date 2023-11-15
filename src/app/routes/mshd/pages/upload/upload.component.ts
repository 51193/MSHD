import { Component } from '@angular/core';
import {DisasterCodeInfos} from "../../interfaces/mshd.interface";
import {DisasterCodeInfo} from "../../interfaces/mshd.interface";
import {MshdService} from "../../services/mshd.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent {
  public infos: DisasterCodeInfos= [] ;
  public info: DisasterCodeInfo = {
    active: 0,
    carrier: "",
    createTime: "",
    description: "",
    disasterId: "",
    disasterMain: "",
    disasterSub: "",
    disasterTarget: "",
    fileTime: "",
    fileUploader: "",
    fileUrl: "",
    haveFile: 0,
    latitude: 0,
    locationCity: "",
    locationCounty: "",
    locationProvince: "",
    locationTown: "",
    locationVillage: "",
    longitude: 0,
    sourceMain: "",
    sourceSub: "",
    uploadTime: "",
    username: "",
    id:1
  };
  disasterId:string="";
  locationProvince:string="";
  date = null;
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  constructor(private mshdService: MshdService) {
    mshdService.DisasterCodeInfos$.subscribe((infos) => {
      this.infos = infos;
    });
  }
  submit(){
    this.getDisasterId();
    this.info.disasterId=this.disasterId;
    this.infos.push(this.info);
    this.mshdService.DisasterCodeInfos$.next(this.infos);
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  getDisasterId(){
    this.disasterId=(document.getElementById("disasterId")as HTMLInputElement).value;
    document.getElementById("disasterId");
  }

}
