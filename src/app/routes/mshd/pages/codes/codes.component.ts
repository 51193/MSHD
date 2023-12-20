import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.less'],
})
export class CodesComponent {
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
