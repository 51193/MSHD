import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  startWith,
  map,
} from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

interface FilingTableItem {
  carrier: string;
  city: string;
  county: string;
  description: string;
  disaster_code: string;
  province: string;
  town: string;
  village: string;
  source_type: string;
  source_subtype: string;
  disaster_type: string;
  disaster_subtype: string;
  disaster_index: string;
  time: string;
  have_file: string;
}

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.less',
})
export class ManageComponent {
  visible = false;
  // 在组件中添加一个属性来存储选中的灾情数据
  public selectedDisasterData: FilingTableItem | null = null;

  redirectToLink() {
    // 使用 window.location.href 跳转到指定链接
    window.location.href = 'http://10.129.71.8:5000/disaster_code/export'; // 你的导出链接
  }
  // 定义打开抽屉的方法
  openDrawer(data: FilingTableItem) {
    // 将选中的灾情数据存储到属性中
    this.selectedDisasterData = data;
    // 打开抽屉
    this.visible = true;
  }

  delete(data: FilingTableItem) {
    this.selectedDisasterData = data;
    this.http
      .post<string>('disaster_code/delete', {
        disaster_code: data.disaster_code,
      })
      .subscribe((data: string) => {
        // 成功接收到数据后，将数据转换成所需的格式
        console.log(data);
        // 刷新表格数据
        this.refresh$.next(true);

        // 显示成功消息
        this.message.create('success', `删除成功`);
      });
    this.message.create('success', `上传成功`);
  }

  public close(): void {
    this.visible = false;
  }
  constructor(private message: NzMessageService, private http: HttpClient) {}

  public pageSize$ = new BehaviorSubject<number>(10);
  public pageIndex$ = new BehaviorSubject<number>(1);
  public total$ = new BehaviorSubject<number>(1);
  public loading$ = new BehaviorSubject<boolean>(true);
  public refresh$ = new BehaviorSubject<boolean>(true);

  public data$: Observable<FilingTableItem[]> = combineLatest([
    this.pageSize$,
    this.pageIndex$,
    this.refresh$,
  ]).pipe(
    switchMap(([pageSize, pageIndex]) => {
      this.loading$.next(true);
      return this.http.post<{
        count: number;
        items: FilingTableItem[];
      }>('disaster_code/display', {
        pageSize: pageSize,
        pageIndex: pageIndex,
      });
    }),
    map((res) => {
      this.loading$.next(false);
      this.total$.next(res.count);
      return res.items;
    }),
    startWith([])
  );
}
// disaster_code/display
