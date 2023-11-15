import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Line} from '@antv/g2plot';
import {DisasterCodeInfos} from "../../interfaces/mshd.interface";
import {MshdService} from "../../services/mshd.service";
import {Pie} from '@antv/g2plot';
import { Heatmap } from '@antv/g2plot';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.less']
})
export class VisualizationComponent implements OnInit, AfterViewInit {
  public infos: DisasterCodeInfos = [];

  // 示例数据结构
  public lineChartData = [
    {year: '2008', value: 1200},
    {year: '2009', value: 1500},
    {year: '2010', value: 1800},
    {year: '2011', value: 2000},
    {year: '2012', value: 1700},
    {year: '2013', value: 2200},
    {year: '2014', value: 2500},
    {year: '2015', value: 3000},
    {year: '2016', value: 2800},
    {year: '2017', value: 2300},
    {year: '2018', value: 2600},
    {year: '2019', value: 3100},
    {year: '2020', value: 3200},
    {year: '2021', value: 2900},
    {year: '2022', value: 3400},
    // ... 继续添加更多数据
  ];

  public pieChartData = [
    {province: '北京', value: 500},
    {province: '上海', value: 800},
    {province: '广东', value: 1200},
    {province: '江苏', value: 950},
    {province: '浙江', value: 700},
    {province: '四川', value: 3600},
    {province: '湖北', value: 1100},
    {province: '辽宁', value: 400},
    {province: '河南', value: 850},
    {province: '福建', value: 550},
    // ... 其他省份数据
  ];


  constructor(private mshdService: MshdService) {
   }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.mshdService.DisasterCodeInfos$.subscribe((infos) => {
      this.infos = infos;

      this.lineChartData = [
        {year: '2008', value: 1200},
        {year: '2009', value: 1500},
        {year: '2010', value: 1800},
        {year: '2011', value: 2000},
        {year: '2012', value: 1700},
        {year: '2013', value: 2200},
        {year: '2014', value: 2500},
        {year: '2015', value: 3000},
        {year: '2016', value: 2800},
        {year: '2017', value: 2300},
        {year: '2018', value: 2600},
        {year: '2019', value: 3100},
        {year: '2020', value: 3200},
        {year: '2021', value: 2900},
        {year: '2022', value: 3400},
        // ... 继续添加更多数据
      ];

      this.pieChartData = [
        {province: '北京', value: 500},
        {province: '上海', value: 800},
        {province: '广东', value: 1200},
        {province: '江苏', value: 950},
        {province: '浙江', value: 700},
        {province: '四川', value: 3600},
        {province: '湖北', value: 1100},
        {province: '辽宁', value: 400},
        {province: '河南', value: 850},
        {province: '福建', value: 550},
        // ... 其他省份数据
      ];




      this.drawLineChart();
      this.drawPieChart();

    });

    // this.drawPieChart();
    // this.drawLineChart();
  }

  private drawLineChart() {
    // 使用 this.lineChartData 进行绘图
    const lineChart = new Line('lineContainer', {
      data: this.lineChartData,
      xField: 'year',
      yField: 'value',
      // 可以添加其他配置项
      point: {
        size: 5,
        shape: 'diamond',
        style: {
          fill: '#FE740C',
        },
      },
      interactions: [{type: 'tooltip'}], // 启用 Tooltip 交互
    });

    lineChart.render();
  }

  private drawPieChart() {
    const pieChart = new Pie('pieContainer', {
      data: this.pieChartData,
      angleField: 'value',
      colorField: 'province',
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          formatter: (v) => `数量: ${v}`,
        },
      },
      label: {
        type: 'inner',
        offset: '-50%',
        autoRotate: false,
        style: {textAlign: 'center'},
        formatter: ({percent}) => `${(percent * 100).toFixed(0)}%`,
      },
      statistic: {
        title: {
          offsetY: -8,
        },
        content: {
          offsetY: -4,
        },
      },
    });

    pieChart.render();
  }



  onBack(): void {
    console.log('onBack');
  }

}
