import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Menus} from '../interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private _menus$ = new BehaviorSubject<Menus>([{
    level: 1, title: "首页", icon: "dashboard", selected: true, disabled: false,
  }]);
  get menus$(): BehaviorSubject<Menus> {
    return this._menus$;
  }
}

export interface Menu {
  level: number;
  title: string;
  icon: string | null;
  selected: boolean;
  disabled: boolean;
  routerLink?: string[];
  open?: boolean;
  children?: Menu[];
}
