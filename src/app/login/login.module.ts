import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginComponent } from './login.component';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { RegisterRoutingModule } from '../register/register-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RegisterRoutingModule,
    NzInputModule,
    CommonModule,
    NzButtonModule,
    NzAffixModule,
    NzIconModule,
    FormsModule,
  ],
})
export class LoginModule {}
