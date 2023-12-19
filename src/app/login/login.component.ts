import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [{ provide: NzMessageService }],
})
export class LoginComponent {
  passwordVisible = false;
  password: string | null = null;
  username = 'yyx';
  uid: string | null = null;
  error = false;
  constructor(
    public router: Router,
    private authService: AuthService,
    private message: NzMessageService,
    private userService: UserService
  ) {}

  login() {
    this.uid = (document.getElementById('username') as HTMLInputElement).value;
    this.username = (
      document.getElementById('username') as HTMLInputElement
    ).value;
    this.password = (
      document.getElementById('password') as HTMLInputElement
    ).value;

    // const res = this.authService.login(this.username, this.password);
    this.userService.login$(this.uid, this.password).subscribe((res) => {
      if (res == true) {
        this.message.create('success', `登陆成功`);
        this.router.navigate(['mshd']);
      } else {
        this.message.create('error', `用户名或密码错误`);
      }
    });
  }
}
