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

  //删除用户
  formItemInfos1: CustomFormItemInfos = [
    {
      key: 'adminId',
      formType: 'string',
      title: '管理员账号',
      constraint: {
        required: true,
        placeholder: '请输入管理员账号：',
        password: false,
      },
    },
    {
      key: 'adminPassword',
      formType: 'string',
      title: '管理员密码',
      constraint: {
        required: true,
        placeholder: '请输入管理员密码：',
        password: true,
      },
    },
    {
      key: 'deleteUser',
      formType: 'string',
      title: '要删除的用户',
      constraint: {
        required: true,
        placeholder: '请输入要删除的用户名：',
        password: false,
      },
    },
  ];

  formData1$ = new ReplaySubject<CustomFormData>(1);

  formItemInfos: CustomFormItemInfos = [
    {
      key: 'password',
      formType: 'string',
      title: '原密码',
      constraint: {
        required: true,
        placeholder: '请输入原密码：',
        password: true,
      },
    },
    {
      key: 'newPassword',
      formType: 'string',
      title: '新密码',
      constraint: {
        required: true,
        placeholder: '请输入新密码：',
        password: true,
      },
    },
    {
      key: 'confirmPassword',
      formType: 'string',
      title: '确认密码',
      constraint: {
        required: true,
        placeholder: '请确认新密码：',
        password: true,
      },
    },
  ];
  formData$ = new ReplaySubject<CustomFormData>(1);

  //注册用户
  formItemInfos2: CustomFormItemInfos = [
    {
      key: 'adminId',
      formType: 'string',
      title: '管理员账号',
      constraint: {
        required: true,
        placeholder: '请输入管理员账号：',
        password: false,
      },
    },
    {
      key: 'adminPassword',
      formType: 'string',
      title: '管理员密码',
      constraint: {
        required: true,
        placeholder: '请输入管理员密码：',
        password: true,
      },
    },
    {
      key: 'userId',
      formType: 'string',
      title: '新用户名',
      constraint: {
        required: true,
        placeholder: '请输入新用户名：',
        password: false,
      },
    },
    {
      key: 'password',
      formType: 'string',
      title: '密码',
      constraint: {
        required: true,
        placeholder: '请输入密码：',
        password: true,
      },
    },
  ];

  formData2$ = new ReplaySubject<CustomFormData>(1);

  ngOnInit(): void {
    this.formData$.subscribe((res) => {
      const password = res[0].value as string;
      const newPassword = res[1].value as string;
      const confirmPassword = res[2].value as string;

      if (newPassword != confirmPassword) {
        this.message.error('两次密码不同！');
        return;
      }

      this.userService
        .changePassword$(password, newPassword)
        .subscribe((res) => {
          if (res === true) {
            this.message.success('修改成功！');
          } else {
            this.message.error('原密码错误！');
          }
        });
    });

    //删除用户
    this.formData1$.subscribe((res) => {
      const adminId = res[0].value as string;
      const password = res[1].value as string;
      const deleteUser = res[2].value as string;

      this.userService
        .deleteUser$(adminId, password, deleteUser)
        .subscribe((res) => {
          if (res === true) {
            this.message.success('删除成功！');
          } else {
            this.message.error('删除失败！');
          }
        });
    });

    //添加用户
    this.formData2$.subscribe((res) => {
      const adminId = res[0].value as string;
      const adminPassword = res[1].value as string;
      const userId = res[2].value as string;
      const password = res[3].value as string;

      this.userService
        .addUser$(adminId, adminPassword, userId, password)
        .subscribe((res) => {
          if (res === true) {
            this.message.success('添加成功！');
          } else {
            this.message.error('添加失败！');
          }
        });
    });
  }
}
