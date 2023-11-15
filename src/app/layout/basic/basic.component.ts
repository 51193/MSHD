import { Component } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../services/layout.service';
import { MenusService } from '../services/menus.service';
import { AuthService } from '../../services/auth.service';
import { Menus } from '../interfaces/menu';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less'],
  providers: [{ provide: NzMessageService }],
})
export class BasicComponent {
  constructor(
    public themeService: ThemeService,
    public layoutService: LayoutService,
    public menuService: MenusService,
    public authService: AuthService,
    private router: Router,
    public msg: NzMessageService
  ) {}

  public isCollapsed$ = new BehaviorSubject<boolean>(false);

  //ExpressionChangedAfterItHasBeenCheckedError
  //如果子组件构造时立刻通知修改menus，则会出现在变更检测中子组件更改父组件的情形
  //通过delay(0)延迟到下一个周期变更检测周期
  public menus$: Observable<Menus> = this.menuService.menus$.pipe(delay(0));
  navigateTo(targetRoute: string): void {
    // 使用 Router 服务的 navigate 方法导航到目标路由
    this.router.navigate([targetRoute]);
  }

  handleChange(info: NzUploadChangeParam): void {
    this.msg.success(`${info.file.name} file uploaded successfully`);
  }
}
