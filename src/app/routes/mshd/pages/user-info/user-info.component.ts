import { Component, OnInit } from '@angular/core';
import { ReplaySubject, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import {
  CustomFormData,
  CustomFormItemInfos,
} from 'src/app/shared/components/custom-form/interfaces/custom-form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less'],
})
export class UserInfoComponent implements OnInit {
  constructor(
    private message: NzMessageService,
    private userService: UserService
  ) {}

  formItemInfos: CustomFormItemInfos = [
    {
      key: 'uid',
      formType: 'string',
      title: '用户名',
      constraint: {
        required: true,
        placeholder: '',
        password: false,
      },
    },
    {
      key: 'password',
      formType: 'string',
      title: '原密码',
      constraint: {
        required: true,
        placeholder: '',
        password: true,
      },
    },
    {
      key: 'newPassword',
      formType: 'string',
      title: '新密码',
      constraint: {
        required: true,
        placeholder: '',
        password: true,
      },
    },
    {
      key: 'confirmPassword',
      formType: 'string',
      title: '确认密码',
      constraint: {
        required: true,
        placeholder: '',
        password: true,
      },
    },
  ];

  formData$ = new ReplaySubject<CustomFormData>();

  ngOnInit(): void {
    this.formData$.subscribe((res) => {
      const uid = res[0].value as string;
      const password = res[1].value as string;
      const newPassword = res[2].value as string;
      const confirmPassword = res[3].value as string;

      if (newPassword != confirmPassword) {
        this.message.error('两次密码不同！');
        return;
      }

      this.userService
        .changePassword$(uid, password, newPassword)
        .subscribe((res) => {
          if (res === true) {
            this.message.success('修改成功！');
          } else {
            this.message.error('原密码错误！');
          }
        });
    });
  }
}
