import { Component, OnInit } from '@angular/core';
import { DisasterCodeInfos } from '../../interfaces/mshd.interface';
import { MshdService } from '../../services/mshd.service';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less'],
})
export class UploadComponent implements OnInit {
  validateForm: FormGroup<{
    selectedSource: FormControl<string | null>;
    selectedDisaster: FormControl<string | null>;
    selectedDisasterIndex: FormControl<string | null>;
    selectedCarrier: FormControl<string | null>;
    selectedDate: FormControl<string | null>;
    selectedTime: FormControl<string | null>;
  }> = this.fb.group({
    selectedSource: ['', [Validators.required]],
    selectedDisaster: ['', [Validators.required]],
    selectedDisasterIndex: ['', [Validators.required]],
    selectedCarrier: ['', [Validators.required]],
    selectedDate: ['', [Validators.required]],
    selectedTime: ['', [Validators.required]],
  });
  ngOnInit() {
    //发送 GET 请求到后端 API
    this.http.get<string[]>('province').subscribe((data: string[]) => {
      // 成功接收到数据后，将数据转换成所需的格式
      this.responseData = data.map((item) => ({
        value: item[0],
        label: item[0],
        isLeaf: true,
      }));
      this.nzOptions_province = this.responseData;
    });
  }
  onProvinceChange(selectedProvince: string) {
    if (selectedProvince.length != 0) {
      console.log(selectedProvince);
      // 发送选中的省份到后端，获取对应的城市数据
      this.http
        .post<string[]>('city', { province: selectedProvince })
        .subscribe((data: string[]) => {
          // 成功接收到数据后，将数据转换成所需的格式
          this.responseData = data.map((item) => ({
            value: item[0],
            label: item[0],
            isLeaf: true,
          }));
          this.nzOptions_city = this.responseData;
        });
    } else {
      // 如果未选择省份，清空城市选项
      this.nzOptions_city = [];
      this.nzOptions_county = [];
      this.nzOptions_town = [];
      this.nzOptions_village = [];
      this.selectedCity = null;
      this.selectedCounty = null;
      this.selectedTown = null;
      this.selectedVillage = null;
    }
  }
  onCityChange(selectedCity: string) {
    if (selectedCity.length != 0) {
      console.log(selectedCity);
      // 发送选中的省份到后端，获取对应的城市数据
      this.http
        .post<string[]>('county', {
          province: this.selectedProvince,
          city: selectedCity,
        })
        .subscribe((data: string[]) => {
          // 成功接收到数据后，将数据转换成所需的格式
          this.responseData = data.map((item) => ({
            value: item[0],
            label: item[0],
            isLeaf: true,
          }));
          this.nzOptions_county = this.responseData;
        });
    } else {
      // 如果未选择省份，清空城市选项
      this.nzOptions_county = [];
      this.nzOptions_town = [];
      this.nzOptions_village = [];
      this.selectedCounty = null;
      this.selectedTown = null;
      this.selectedVillage = null;
    }
  }
  onCountyChange(selectedCounty: string) {
    if (selectedCounty.length != 0) {
      console.log(selectedCounty);
      // 发送选中的省份到后端，获取对应的城市数据
      this.http
        .post<string[]>('town', {
          province: this.selectedProvince,
          city: this.selectedCity,
          county: selectedCounty,
        })
        .subscribe((data: string[]) => {
          // 成功接收到数据后，将数据转换成所需的格式
          this.responseData = data.map((item) => ({
            value: item[0],
            label: item[0],
            isLeaf: true,
          }));
          this.nzOptions_town = this.responseData;
        });
    } else {
      // 如果未选择省份，清空城市选项
      this.nzOptions_town = [];
      this.nzOptions_village = [];
      this.selectedTown = null;
      this.selectedVillage = null;
    }
  }
  onTownChange(selectedTown: string) {
    if (selectedTown.length != 0) {
      console.log(selectedTown);
      // 发送选中的省份到后端，获取对应的城市数据
      this.http
        .post<string[]>('village', {
          province: this.selectedProvince,
          city: this.selectedCity,
          county: this.selectedCounty,
          town: selectedTown,
        })
        .subscribe((data: string[]) => {
          // 成功接收到数据后，将数据转换成所需的格式
          this.responseData = data.map((item) => ({
            value: item[0],
            label: item[0],
            isLeaf: true,
          }));
          this.nzOptions_village = this.responseData;
        });
    } else {
      // 如果未选择省份，清空城市选项
      this.nzOptions_village = [];
      this.selectedVillage = null;
    }
  }
  onVillageChange(selectedProvince: string) {
    if (selectedProvince.length != 0) {
      console.log(selectedProvince);
      // 发送选中的省份到后端，获取对应的城市数据
      this.http
        .post<string[]>('city', { province: selectedProvince })
        .subscribe((data: string[]) => {
          // 成功接收到数据后，将数据转换成所需的格式
          this.responseData = data.map((item) => ({
            value: item[0],
            label: item[0],
            isLeaf: true,
          }));
          this.nzOptions_city = this.responseData;
        });
    } else {
      // 如果未选择省份，清空城市选项
    }
  }
  onSourseChange(selectedSource: string) {
    console.log(selectedSource);
  }
  onDisasterChange(selectedDisaster: string) {
    console.log(selectedDisaster);
    if (selectedDisaster.at(0) == '震情') {
      this.nzOptions_disaster_index = this.dz_options;
    } else if (selectedDisaster.at(0) == '人员伤亡及失踪') {
      this.nzOptions_disaster_index = this.ry_options;
    } else if (selectedDisaster.at(0) == '房屋破坏') {
      this.nzOptions_disaster_index = this.fw_options;
    } else if (selectedDisaster.at(0) == '生命线工程灾情') {
      this.nzOptions_disaster_index = this.sm_options;
    } else if (selectedDisaster.at(0) == '次生灾害') {
      this.nzOptions_disaster_index = this.cs_options;
    } else if (selectedDisaster.length != 0) {
      /* empty */
    } else {
      this.nzOptions_disaster_index = [];
      this.selectedDisasterIndex = null;
    }
  }
  onCarrierChange(selectedCarrier: string) {
    console.log(selectedCarrier);
  }
  onDisasterIndexChange(selectedDisasterIndex: string) {
    console.log(selectedDisasterIndex);
  }
  onDateChange(result: Date): void {
    const year = result.getFullYear();
    const month = (result.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = result.getUTCDate().toString().padStart(2, '0');
    this.selectedDate = `${year}${month}${day}`;
    console.log(this.selectedDate);
  }
  onTimeChange(result: Date): void {
    const hour = result.getHours().toString().padStart(2, '0');
    const minute = result.getMinutes().toString().padStart(2, '0');
    const second = result.getSeconds().toString().padStart(2, '0');
    this.selectedTime = `${hour}${minute}${second}`;
    console.log(this.selectedTime);
  }
  onDescriptionChange(Description: string): void {
    console.log(Description);
  }

  myForm: FormGroup;
  responseData: { value: string; label: string; isLeaf: boolean }[] = [];
  nzOptions_province: NzCascaderOption[] = [];
  nzOptions_city: NzCascaderOption[] = [];
  nzOptions_county: NzCascaderOption[] = [];
  nzOptions_town: NzCascaderOption[] = [];
  nzOptions_village: NzCascaderOption[] = [];
  selectedProvince: string | null = null;
  selectedCity: string | null = null;
  selectedCounty: string | null = null;
  selectedTown: string | null = null;
  selectedVillage: string | null = null;
  selectedSource: string | null = null;
  selectedCarrier: string | null = null;
  selectedDisaster: string | null = null;
  selectedDisasterIndex: string | null = null;
  selectedDate: string | null = null;
  selectedTime: string | null = null;
  Description: string | null = null;
  public infos: DisasterCodeInfos = [];

  disaster_options = [
    {
      value: '震情',
      label: '震情',
      children: [
        {
          value: '震情信息',
          label: '震情信息',
          isLeaf: true,
        },
      ],
    },
    {
      value: '人员伤亡及失踪',
      label: '人员伤亡及失踪',
      children: [
        {
          value: '死亡',
          label: '死亡',
          isLeaf: true,
        },
        {
          value: '受伤',
          label: '受伤',
          isLeaf: true,
        },
        {
          value: '失踪',
          label: '失踪',
          isLeaf: true,
        },
      ],
    },
    {
      value: '房屋破坏',
      label: '房屋破坏',
      children: [
        {
          value: '土木',
          label: '土木',
          isLeaf: true,
        },
        {
          value: '砖木',
          label: '砖木',
          isLeaf: true,
        },
        {
          value: '砖混',
          label: '砖混',
          isLeaf: true,
        },
        {
          value: '框架',
          label: '框架',
          isLeaf: true,
        },
        {
          value: '其他',
          label: '其他',
          isLeaf: true,
        },
      ],
    },
    {
      value: '生命线工程灾情',
      label: '生命线工程灾情',
      children: [
        {
          value: '交通',
          label: '交通',
          isLeaf: true,
        },
        {
          value: '供水',
          label: '供水',
          isLeaf: true,
        },
        {
          value: '输油',
          label: '输油',
          isLeaf: true,
        },
        {
          value: '燃气',
          label: '燃气',
          isLeaf: true,
        },
        {
          value: '电力',
          label: '电力',
          isLeaf: true,
        },
        {
          value: '通信',
          label: '通信',
          isLeaf: true,
        },
        {
          value: '水利',
          label: '水利',
          isLeaf: true,
        },
      ],
    },
    {
      value: '次生灾害',
      label: '次生灾害',
      children: [
        {
          value: '崩塌',
          label: '崩塌',
          isLeaf: true,
        },
        {
          value: '滑坡',
          label: '滑坡',
          isLeaf: true,
        },
        {
          value: '泥石流',
          label: '泥石流',
          isLeaf: true,
        },
        {
          value: '岩溶塌陷',
          label: '岩溶塌陷',
          isLeaf: true,
        },
        {
          value: '地裂缝',
          label: '地裂缝',
          isLeaf: true,
        },
        {
          value: '地面沉降',
          label: '地面沉降',
          isLeaf: true,
        },
        {
          value: '其他',
          label: '其他',
          isLeaf: true,
        },
      ],
    },
  ];
  carrier_options = [
    {
      value: '文字',
      label: '文字',
      isLeaf: true,
    },
    {
      value: '图像',
      label: '图像',
      isLeaf: true,
    },
    {
      value: '音频',
      label: '音频',
      isLeaf: true,
    },
    {
      value: '视频',
      label: '视频',
      isLeaf: true,
    },
    {
      value: '其他',
      label: '其他',
      isLeaf: true,
    },
  ];
  source_options = [
    {
      value: '业务报送数据',
      label: '业务报送数据',
      children: [
        {
          value: '前方地震应急指挥部',
          label: '前方地震应急指挥部',
          isLeaf: true,
        },
        {
          value: '后方地震应急指挥部',
          label: '后方地震应急指挥部',
          isLeaf: true,
        },
        {
          value: '应急指挥技术系统',
          label: '应急指挥技术系统',
          isLeaf: true,
        },
        {
          value: '社会服务工程应急救援系统',
          label: '社会服务工程应急救援系统',
          isLeaf: true,
        },
        {
          value: '危险区评估工作组',
          label: '危险区评估工作组',
          isLeaf: true,
        },
        {
          value: '地震应急指挥技术协调组',
          label: '地震应急指挥技术协调组',
          isLeaf: true,
        },
        {
          value: '震后政府信息支持工作项目组',
          label: '震后政府信息支持工作项目组',
          isLeaf: true,
        },
        {
          value: '灾情快速上报接收处理系统',
          label: '灾情快速上报接收处理系统',
          isLeaf: true,
        },
        {
          value: '地方地震局应急信息服务相关技术系统',
          label: '地方地震局应急信息服务相关技术系统',
          isLeaf: true,
        },
        {
          value: '其他',
          label: '其他',
          isLeaf: true,
        },
      ],
    },
    {
      value: '泛在感知数据',
      label: '泛在感知数据',
      children: [
        {
          value: '互联网感知',
          label: '互联网感知',
          isLeaf: true,
        },
        {
          value: '通信网感知',
          label: '通信网感知',
          isLeaf: true,
        },
        {
          value: '舆情网感知',
          label: '舆情网感知',
          isLeaf: true,
        },
        {
          value: '电力系统感知',
          label: '电力系统感知',
          isLeaf: true,
        },
        {
          value: '交通系统感知',
          label: '交通系统感知',
          isLeaf: true,
        },
        {
          value: '其他',
          label: '其他',
          isLeaf: true,
        },
      ],
    },
    {
      value: '其他',
      label: '其他',
      isLeaf: true,
    },
  ];
  dz_options = [
    {
      value: '地理位置',
      label: '地理位置',
      isLeaf: true,
    },
    {
      value: '时间',
      label: '时间',
      isLeaf: true,
    },
    {
      value: '震级',
      label: '震级',
      isLeaf: true,
    },
    {
      value: '震源深度',
      label: '震源深度',
      isLeaf: true,
    },
    {
      value: '烈度',
      label: '烈度',
      isLeaf: true,
    },
  ];
  ry_options = [
    {
      value: '受灾人数',
      label: '受灾人数',
      isLeaf: true,
    },
    {
      value: '受灾程度',
      label: '受灾程度',
      isLeaf: true,
    },
  ];
  fw_options = [
    {
      value: '一般破坏面积',
      label: '一般破坏面积',
      isLeaf: true,
    },
    {
      value: '严重破坏面积',
      label: '严重破坏面积',
      isLeaf: true,
    },
    {
      value: '受灾程度',
      label: '受灾程度',
      isLeaf: true,
    },
  ];
  sm_options = [
    {
      value: '受灾设施数',
      label: '受灾设施数',
      isLeaf: true,
    },
    {
      value: '受灾范围',
      label: '受灾范围',
      isLeaf: true,
    },
    {
      value: '受灾程度',
      label: '受灾程度',
      isLeaf: true,
    },
  ];
  cs_options = [
    {
      value: '灾害损失',
      label: '灾害损失',
      isLeaf: true,
    },
    {
      value: '灾害范围',
      label: '灾害范围',
      isLeaf: true,
    },
    {
      value: '受灾程度',
      label: '受灾程度',
      isLeaf: true,
    },
  ];
  nzOptions_source: NzCascaderOption[] = this.source_options;
  nzOptions_carrier: NzCascaderOption[] = this.carrier_options;
  nzOptions_disaster: NzCascaderOption[] = this.disaster_options;
  nzOptions_disaster_index: NzCascaderOption[] = [];

  description?: string;

  values_source: string[] = [];
  values_carrier: string[] = [];
  values_disaster: string[] = [];
  values_disaster_index: string[] = [];

  onChanges(values: string[]): void {
    console.log(values, this.values_disaster);
  }
  disasterId: string = '';
  locationProvince: string = '';
  date = null;
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  constructor(
    private fb: FormBuilder,
    private mshdService: MshdService,
    private http: HttpClient,
    private message: NzMessageService
  ) {
    mshdService.DisasterCodeInfos$.subscribe((infos) => {
      this.infos = infos;
    });
    this.myForm = this.fb.group({
      province: [null],
    });
  }
  submit() {
    if (
      this.selectedProvince?.length == 0 ||
      this.selectedProvince == null ||
      this.selectedCity?.length == 0 ||
      this.selectedCity == null ||
      this.selectedCounty?.length == 0 ||
      this.selectedCounty == null ||
      this.selectedTown?.length == 0 ||
      this.selectedTown == null ||
      this.selectedVillage?.length == 0 ||
      this.selectedVillage == null ||
      this.selectedSource?.length == 0 ||
      this.selectedSource == null ||
      this.selectedCarrier?.length == 0 ||
      this.selectedCarrier == null ||
      this.selectedDisaster?.length == 0 ||
      this.selectedDisaster == null ||
      this.selectedDisasterIndex?.length == 0 ||
      this.selectedDisasterIndex == null ||
      this.selectedDate?.length == 0 ||
      this.selectedDate == null ||
      this.selectedTime?.length == 0 ||
      this.selectedTime == null ||
      this.Description?.length == 0 ||
      this.Description == null
    ) {
      this.message.create('error', `数据不完整`);
    } else {
      this.http
        .post<string>('disaster_code/submit', {
          province: this.selectedProvince?.at(0),
          city: this.selectedCity?.at(0),
          county: this.selectedCounty?.at(0),
          town: this.selectedTown?.at(0),
          village: this.selectedVillage?.at(0),
          source_type: this.selectedSource?.at(0),
          source_subtype: this.selectedSource?.at(1),
          carrier: this.selectedCarrier?.at(0),
          disaster_type: this.selectedDisaster?.at(0),
          disaster_subtype: this.selectedDisaster?.at(1),
          disaster_index: this.selectedDisasterIndex?.at(0),
          date: this.selectedDate,
          time: this.selectedTime,
          description: this.Description,
          have_file: '0',
        })
        .subscribe((data: string) => {
          // 成功接收到数据后，将数据转换成所需的格式
          console.log(data);
        });
      this.message.create('success', `上传成功`);
    }
  }

  getDisasterId() {
    this.disasterId = (
      document.getElementById('disasterId') as HTMLInputElement
    ).value;
    document.getElementById('disasterId');
  }
}
