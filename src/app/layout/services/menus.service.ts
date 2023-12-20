import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menus } from '../interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private _menus$ = new BehaviorSubject<Menus>([
    {
      level: 1,
      title: '首页',
      icon: 'dashboard',
      selected: true,
      disabled: false,
      routerLink: ['mshd', 'home'],
    },
    {
      level: 1,
      title: '灾情码',
      icon: 'dashboard',
      selected: false,
      disabled: false,
      routerLink: ['mshd', 'codes'],
    },
    {
      level: 1,
      title: '灾情可视化',
      icon: 'dashboard',
      selected: false,
      disabled: false,
      routerLink: ['mshd', 'visualization'],
    },
    {
      level: 1,
      title: '灾情地图',
      icon: 'dashboard',
      selected: false,
      disabled: false,
      routerLink: ['mshd', 'map'],
    },
    {
      level: 1,
      title: '上传灾情码',
      icon: 'dashboard',
      selected: false,
      disabled: false,
      routerLink: ['mshd', 'upload'],
    },
    {
      level: 1,
      title: '管理灾情码',
      icon: 'dashboard',
      selected: false,
      disabled: false,
      routerLink: ['mshd', 'manage'],
    },
    {
      level: 1,
      title: '用户信息',
      icon: 'dashboard',
      selected: false,
      disabled: false,
      routerLink: ['mshd', 'userInfo'],
    },
  ]);
  get menus$(): BehaviorSubject<Menus> {
    return this._menus$;
  }
}
