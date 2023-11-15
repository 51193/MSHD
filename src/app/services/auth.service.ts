import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(public http: HttpClient, public router: Router) {
    this.http
      .post(
        'user/login',
        { 'test-message': undefined, '123': undefined },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe((response) => {
        //console.log(response);
        this.login_state = response.toString();
      });
  }

  public login_state = '3';
  login(username: string | undefined, password: string | undefined): string {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    //
    const api = 'user/login';

    if (username == 'admin' && password == '123') {
      return '1';
    }
    return '3';
    this.http
      .post(api, { username: username, password: password }, httpOptions)
      .subscribe(async (response) => {
        //console.log(response);
        this.login_state = response.toString();
        //console.log(this.a);
        //setTimeout("alert('对不起, 要你久候')", 3000);
        if (this.login_state == '1') {
          localStorage.setItem(
            'currentUser',
            JSON.stringify({ username: username })
          );
          await this.router.navigate(['/blog']);
          return '1';
        } else {
          console.log('error');
          return '2';
        }
      });
    // 实现用户名和密码的验证逻辑
    if (this.login_state == '3') {
      console.log('3');
    }
    return '3';

    // 如果验证通过，将用户信息保存到本地存储中
  }
  logout() {
    // 从本地存储中清除当前用户信息
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
