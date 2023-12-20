import { AfterViewInit, Component } from '@angular/core';
import { Line } from '@antv/g2plot';
import { DisasterCodeInfos } from '../../interfaces/mshd.interface';
import { MshdService } from '../../services/mshd.service';
import { Pie } from '@antv/g2plot';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.less'],
})
export class VisualizationComponent implements AfterViewInit {
  //public infos: DisasterCodeInfos = [];

  lineChartData: { year: string; value: number }[] = []; //每年的地震次数
  pieChartData: { province: string; value: number }[] = []; //每个省份的地震次数

  constructor(private mshdService: MshdService, private http: HttpClient) {}

  //发送年份
  giveYear(startYear: string, endYear: string) {
    const data = { startYear: startYear, endYear: endYear };
    return this.http.post<{ startYear: string; endYear: string }>('ping', data);
  }

  ngAfterViewInit() {
    //发送年份范围
    // this.giveYear('2002', '2022').subscribe((data) => {
    //   // 处理从后端接收到的数据
    //   console.log(data);
    // });

    // 发送 HTTP GET 请求，获取每年的地震次数 string number
    this.http
      .post<{ year: string; value: number }[]>('disaster_code/yearly', {
        startYear: '2002',
        endYear: '2022',
      })
      .subscribe((data) => {
        this.lineChartData = data;
        console.log('每年的地震次数:', this.lineChartData);
        // 绘制折线图
        this.drawLineChart();
      });

    // 发送 HTTP GET 请求，获取每个省份的地震次数 string number
    this.http
      .post<{ province: string; value: number }[]>('disaster_code/province', {
        //pieChartData: this.pieChartData,
      })
      .subscribe((data) => {
        this.pieChartData = data;
        console.log('每省的地震次数:', this.pieChartData);
        // 绘制饼图
        this.drawPieChart();
      });
  }

  // 绘制折线图
  drawLineChart() {
    // 创建 Line 图表实例并配置参数
    const linePlot = new Line('lineContainer', {
      data: this.lineChartData,
      xField: 'year',
      yField: 'value',
      xAxis: {
        type: 'cat',
        tickCount: 10,
      },
      yAxis: {
        nice: true,
        min: 300,
      },
    });

    // 渲染折线图
    linePlot.render();
  }

  // 绘制饼图
  drawPieChart() {
    // 创建 Pie 图表实例并配置参数
    const piePlot = new Pie('pieContainer', {
      data: this.pieChartData,
      angleField: 'value',
      colorField: 'province',
      radius: 0.9,
    });

    // 渲染饼图
    piePlot.render();
  }
}
