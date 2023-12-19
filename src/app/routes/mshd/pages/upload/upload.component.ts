import { Component, OnInit } from '@angular/core';
import { DisasterCodeInfos } from '../../interfaces/mshd.interface';
import { DisasterCodeInfo } from '../../interfaces/mshd.interface';
import { MshdService } from '../../services/mshd.service';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less'],
})
export class UploadComponent implements OnInit {
  ngOnInit() {
    // 发送 GET 请求到后端 API
    this.http.get('province').subscribe(
      (data) => {
        // 成功接收到数据后，将数据赋给 responseData 变量
        this.responseData = data;
        console.log(this.responseData);
      },
      (error) => {
        // 处理请求错误
        console.error('请求发生错误:', error);
      }
    );
  }
  responseData: any;
  data$: Observable<any> | undefined; // 使用 Observable 来接收后端数据
  public infos: DisasterCodeInfos = [];
  public info: DisasterCodeInfo = {
    active: 0,
    carrier: '',
    createTime: '',
    description: '',
    disasterId: '',
    disasterMain: '',
    disasterSub: '',
    disasterTarget: '',
    fileTime: '',
    fileUploader: '',
    fileUrl: '',
    haveFile: 0,
    latitude: 0,
    locationCity: '',
    locationCounty: '',
    locationProvince: '',
    locationTown: '',
    locationVillage: '',
    longitude: 0,
    sourceMain: '',
    sourceSub: '',
    uploadTime: '',
    username: '',
    id: 1,
  };

  disaster_options = [
    {
      value: '1',
      label: '震情',
      children: [
        {
          value: '01',
          label: '震情信息',
          isLeaf: true,
        },
      ],
    },
    {
      value: '2',
      label: '人员伤亡及失踪',
      children: [
        {
          value: '01',
          label: '死亡',
          isLeaf: true,
        },
        {
          value: '02',
          label: '受伤',
          isLeaf: true,
        },
        {
          value: '03',
          label: '失踪',
          isLeaf: true,
        },
      ],
    },
    {
      value: '3',
      label: '房屋破坏',
      children: [
        {
          value: '01',
          label: '土木',
          isLeaf: true,
        },
        {
          value: '02',
          label: '砖木',
          isLeaf: true,
        },
        {
          value: '03',
          label: '砖混',
          isLeaf: true,
        },
        {
          value: '04',
          label: '框架',
          isLeaf: true,
        },
        {
          value: '05',
          label: '其他',
          isLeaf: true,
        },
      ],
    },
    {
      value: '4',
      label: '生命线工程灾情',
      children: [
        {
          value: '01',
          label: '交通',
          isLeaf: true,
        },
        {
          value: '02',
          label: '供水',
          isLeaf: true,
        },
        {
          value: '03',
          label: '输油',
          isLeaf: true,
        },
        {
          value: '04',
          label: '燃气',
          isLeaf: true,
        },
        {
          value: '05',
          label: '电力',
          isLeaf: true,
        },
        {
          value: '06',
          label: '通信',
          isLeaf: true,
        },
        {
          value: '07',
          label: '水利',
          isLeaf: true,
        },
      ],
    },
    {
      value: '5',
      label: '次生灾害',
      children: [
        {
          value: '01',
          label: '崩塌',
          isLeaf: true,
        },
        {
          value: '02',
          label: '滑坡',
          isLeaf: true,
        },
        {
          value: '03',
          label: '泥石流',
          isLeaf: true,
        },
        {
          value: '04',
          label: '岩溶塌陷',
          isLeaf: true,
        },
        {
          value: '05',
          label: '地裂缝',
          isLeaf: true,
        },
        {
          value: '06',
          label: '地面沉降',
          isLeaf: true,
        },
        {
          value: '07',
          label: '其他',
          isLeaf: true,
        },
      ],
    },
  ];
  carrier_options = [
    {
      value: '0',
      label: '文字',
      isLeaf: true,
    },
    {
      value: '1',
      label: '图像',
      isLeaf: true,
    },
    {
      value: '2',
      label: '音频',
      isLeaf: true,
    },
    {
      value: '3',
      label: '视频',
      isLeaf: true,
    },
    {
      value: '4',
      label: '其他',
      isLeaf: true,
    },
  ];
  source_options = [
    {
      value: '1',
      label: '业务报送数据',
      children: [
        {
          value: '00',
          label: '前方地震应急指挥部',
          isLeaf: true,
        },
        {
          value: '01',
          label: '后方地震应急指挥部',
          isLeaf: true,
        },
        {
          value: '20',
          label: '应急指挥技术系统',
          isLeaf: true,
        },
        {
          value: '21',
          label: '社会服务工程应急救援系统',
          isLeaf: true,
        },
        {
          value: '40',
          label: '危险区评估工作组',
          isLeaf: true,
        },
        {
          value: '41',
          label: '地震应急指挥技术协调组',
          isLeaf: true,
        },
        {
          value: '42',
          label: '震后政府信息支持工作项目组',
          isLeaf: true,
        },
        {
          value: '80',
          label: '灾情快速上报接收处理系统',
          isLeaf: true,
        },
        {
          value: '81',
          label: '地方地震局应急信息服务相关技术系统',
          isLeaf: true,
        },
        {
          value: '99',
          label: '其他',
          isLeaf: true,
        },
      ],
    },
    {
      value: '2',
      label: '泛在感知数据',
      children: [
        {
          value: '00',
          label: '互联网感知',
          isLeaf: true,
        },
        {
          value: '01',
          label: '通信网感知',
          isLeaf: true,
        },
        {
          value: '02',
          label: '舆情网感知',
          isLeaf: true,
        },
        {
          value: '03',
          label: '电力系统感知',
          isLeaf: true,
        },
        {
          value: '04',
          label: '交通系统感知',
          isLeaf: true,
        },
        {
          value: '05',
          label: '其他',
          isLeaf: true,
        },
      ],
    },
    {
      value: '300',
      label: '其他',
      isLeaf: true,
    },
  ];
  nzOptions_source: NzCascaderOption[] = this.source_options;
  nzOptions_carrier: NzCascaderOption[] = this.carrier_options;
  nzOptions_disaster: NzCascaderOption[] = this.disaster_options;

  description?: string;

  values_source: string[] = [];
  values_carrier: string[] = [];
  values_disaster: string[] = [];

  onChanges(values: string[]): void {
    console.log(values, this.values_disaster);
  }
  disasterId: string = '';
  locationProvince: string = '';
  date = null;
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  constructor(private mshdService: MshdService, private http: HttpClient) {
    mshdService.DisasterCodeInfos$.subscribe((infos) => {
      this.infos = infos;
    });
  }
  submit() {
    this.getDisasterId();
    this.info.disasterId = this.disasterId;
    this.infos.push(this.info);
    this.mshdService.DisasterCodeInfos$.next(this.infos);
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  getDisasterId() {
    this.disasterId = (
      document.getElementById('disasterId') as HTMLInputElement
    ).value;
    document.getElementById('disasterId');
  }
}
