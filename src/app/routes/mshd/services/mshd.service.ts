import { Injectable } from '@angular/core';
import {
  DisasterCodeInfo,
  DisasterCodeInfos,
} from '../interfaces/mshd.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class MshdService {
  constructor(public http: HttpClient) {
    this.http.get(
      'province',
    )
  }
  DisasterCodeInfos$ = new BehaviorSubject<DisasterCodeInfos>([{
    id: 10,
    disasterId: "123123123123",
    locationProvince: "四川省",
    locationCity: "成都市",
    locationCounty: "锦江区",
    locationTown: "沙河街道",
    locationVillage: "塔子山社区居委会",
    uploadTime: "2023-01-11T08:33:00.000+00:00",
    sourceMain: "业务报送数据",
    sourceSub: "前方地震应急指挥部",
    carrier: "文字",
    disasterMain: "震情",
    disasterSub: "震情信息",
    disasterTarget: "地理位置",
    username: "admin",
    description: "四川省灾情",
    haveFile: 0,
    fileUrl: "null",
    fileUploader: "null",
    fileTime: "null",
    createTime: "null",
    active: 1,
    longitude: 1,
    latitude: 1
  }]);
}
