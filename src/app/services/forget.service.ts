import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ForgetService {
  constructor(public http: HttpClient, public router: Router) {}
  a = '3';

  forget(username: string | undefined, password: string | undefined): string {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    //
    const api = 'user/forget';
    this.http
      .post(api, { username, password }, httpOptions)
      .subscribe(async (response) => {
        //console.log(response);
        this.a = response.toString();
      });
    // 实现用户名和密码的验证逻辑
    if (this.a == '3') {
      console.log('3');
    }
    return '3';

    // 如果验证通过，将用户信息保存到本地存储中
  }
}
