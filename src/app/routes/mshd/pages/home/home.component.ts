import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MshdService} from '../../services/mshd.service';
import {DisasterCodeInfos} from '../../interfaces/mshd.interface';
import {Line} from '@antv/g2plot';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})

// home.component.ts

export class HomeComponent implements OnInit, AfterViewInit {
  public infos: DisasterCodeInfos = [];

  constructor(private mshdService: MshdService) {
    mshdService.DisasterCodeInfos$.subscribe((infos) => {
      this.infos = infos;
    });
  }

  userCount: number = 100; // 请替换为实际的用户数目
  disasterCodeCount: number = 50; // 请替换为实际的灾情码数目
  disasterCount: number = 200; // 请替换为实际的灾情数目
  fileCount: number = 30; // 请替换为实际的文件数目

  // 模拟最近五条灾情记录
  recentDisasterRecords: any[] = [
    {
      disasterCode: '110106006006202311100000001001101001',
      location: '北京市-市辖区 -丰台区-东高地街道-万源东里社区',
      time: '2023-11-09 16:00:00',
      source: '业务报送数据-前方地震应急指挥部',
      carrier: '图像',
      information: '震情-震情信息-地理位置'
    },
    {
      disasterCode: '110101001005202311080000001000101001',
      location: '北京市-市辖区 -东城区-东华门街道-东厂社区居委会',
      time: '2023-11-07 16:00:00',
      source: '业务报送数据-前方地震应急指挥部',
      carrier: '文字',
      information: '震情-震情信息-地理位置'
    },
    {
      disasterCode: '141124111201202311071908041000101001',
      location: '山西省-吕梁市 -临县-丛罗峪镇-下冯家山村委会',
      time: '2023-11-07 11:08:04',
      source: '业务报送数据-前方地震应急指挥部',
      carrier: '文字',
      information: '震情-震情信息-地理位置'
    },
    {
      disasterCode: '653001206000202304011353081000101003',
      location: '新疆维吾尔自治区-克孜勒苏柯尔克孜自治州 -阿图什市-吐古买提乡-',
      time: '2023-04-01 05:53:08',
      source: '业务报送数据-前方地震应急指挥部',
      carrier: '文字',
      information: '震情-震情信息-震级'
    },
    {
      disasterCode: '653001206000202304011353081000101004',
      location: '新疆维吾尔自治区-克孜勒苏柯尔克孜自治州 -阿图什市-吐古买提乡-',
      time: '2023-04-01 05:53:08',
      source: '业务报送数据-前方地震应急指挥部',
      carrier: '文字',
      information: '震情-震情信息-深度'
    },
    // ...
  ];

  yearlyStats: any[] = [
    {year: 2020, count: 15},
    {year: 2021, count: 25},
    {year: 2022, count: 10},
    // Add more data for other years as needed
  ];

  // 折线图数据
  lineChartData: any[] = [{data: this.yearlyStats.map(stat => stat.count), label: '灾情数量'}];
  lineChartLabels: any[] = this.yearlyStats.map(stat => stat.year.toString());
  lineChartType: string = 'line';
  lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: '年份'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '数量'
        }
      }]
    }
  };

  ngOnInit(): void {
    // 在这里可以添加获取按年份统计灾情数量的数据的逻辑，并更新相应的图表数据
  }

  ngAfterViewInit() {
    const data: any = [
      {year: '2012', value: 900},
      {year: '2013', value: 1500},
      {year: '2014', value: 1350},
      {year: '2015', value: 1200},
      {year: '2016', value: 1100},
      {year: '2017', value: 1000},
      {year: '2018', value: 1100},
      {year: '2019', value: 1200},
      {year: '2020', value: 1150},
      {year: '2021', value: 1400},
      {year: '2022', value: 1400},
      {year: '2023', value: 400},
    ];

    const line = new Line('container', {
      data: data,
      xField: 'year',
      yField: 'value',
      label: {},
      point: {
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#5B8FF9',
          lineWidth: 2,
        },
      },
      tooltip: {showMarkers: false},
      state: {
        active: {
          style: {
            shadowBlur: 4,
            stroke: '#000',
            fill: 'red',
          },
        },
      },
      interactions: [{type: 'marker-active'}],
    });

    line.render();
  }
}






