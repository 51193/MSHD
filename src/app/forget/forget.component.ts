import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { ForgetService } from '../services/forget.service';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
// import { MyValidationErrors } from '../register/register.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.less'],
})
export class ForgetComponent {
  password: string | undefined;
  username = 'yyx';
  getCaptcha() {
    console.log('发送验证码');
  }

  forget() {
    this.username = (
      document.getElementById('username') as HTMLInputElement
    ).value;
    this.password = (
      document.getElementById('password') as HTMLInputElement
    ).value;
    this.forgetService.forget(this.username, this.password);
    this.goLogin();
  }
  goLogin() {
    this.router.navigate(['/login']);
  }
  validateForm: UntypedFormGroup;
  // current locale is key of the nzAutoTips
  // if it is not found, it will be searched again with `default`
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
    },
    en: {
      required: 'Input is required',
    },
    default: {
      email: '邮箱格式不正确',
    },
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.forget();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls['confirm'].updateValueAndValidity()
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  userNameAsyncValidator = (control: UntypedFormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: {
              'zh-cn': `用户名已存在`,
              en: `The username is redundant!`,
            },
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: UntypedFormBuilder,
    public router: Router,
    public renderer: Renderer2,
    private forgetService: ForgetService
  ) {
    // use `MyValidators`
    const { required, maxLength, minLength, email, mobile } = MyValidators;
    this.validateForm = this.fb.group({
      userName: [
        '',
        [required, maxLength(12), minLength(6)],
        [this.userNameAsyncValidator],
      ],
      mobile: ['', [required, mobile]],
      email: ['', [required, email]],
      password: ['', [required]],
      confirm: ['', [this.confirmValidator]],
    });
  }
}

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `MinLength is ${minLength}`,
        },
      };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `MaxLength is ${maxLength}`,
        },
      };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value)
      ? null
      : {
          mobile: {
            'zh-cn': `手机号码格式不正确`,
            en: `Mobile phone number is not valid`,
          },
        };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return /(^1\d{10}$)/.test(value);
}
