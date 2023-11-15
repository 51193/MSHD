import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [{ provide: NzMessageService }],
})
export class LoginComponent {
  value: any;
  passwordVisible = false;
  password: string | undefined;
  username = 'yyx';
  error = false;
  constructor(
    public router: Router,
    private authService: AuthService,
    private message: NzMessageService
  ) {}
  createMessageSuccess(): void {
    this.message.create('success', `登陆成功`);
  }
  createMessageError(): void {
    this.message.create('error', `用户名或密码错误`);
  }
  login() {
    this.username = (
      document.getElementById('username') as HTMLInputElement
    ).value;
    this.password = (
      document.getElementById('password') as HTMLInputElement
    ).value;

    const res = this.authService.login(this.username, this.password);
    if (res == '1') {
      this.createMessageSuccess();
      this.router.navigate(['blog']);
    } else {
      this.createMessageError();
    }
    // if (localStorage.getItem('currentUser') == null) {
    //   this.createMessageError();
    //   this.error = true;
    // } else {
    //   this.createMessageSuccess();
    //   this.router.navigate(['/blog']);
    // }
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  goForget() {
    this.router.navigate(['/forget']);
  }
  goBlog() {
    this.router.navigate(['/blog']);
  }
}
