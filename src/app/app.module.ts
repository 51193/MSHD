import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './services/icons-provider.module';
import { AppInitializerProvider } from './services/app-initializer.service';
import { LayoutModule } from './layout/layout.module';
import { httpInterceptorProviders } from './interceptors';
import { LoginModule } from './login/login.module';
import { NotfoundModule } from './notfound/notfound.module';
import { ForgetComponent } from './forget/forget.component';

import en from '@angular/common/locales/en';
import { RegisterModule } from './register/register.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommentComponent } from './routes/blog/pages/comment/comment.component';
import { SubcommentComponent } from './routes/blog/pages/subcomment/subcomment.component';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { SharedModule } from './shared/shared.module';
import { DetailsComponent } from './routes/mshd/pages/codes/details/details.component';
//import { NgZorroAntdModule, NzConfig, NZ_CONFIG } from 'ng-zorro-antd';

registerLocaleData(zh);
const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  message: { nzMaxStack: 1 },
};

@NgModule({
  declarations: [
    AppComponent,
    ForgetComponent,
    CommentComponent,
    SubcommentComponent,
    DetailsComponent,
  ],
  imports: [
    NotfoundModule,
    LoginModule,
    RegisterModule,
    NzInputModule,
    NzButtonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    LayoutModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    SharedModule,
    // eagerly loaded
  ],
  providers: [
    AppInitializerProvider,
    { provide: NZ_I18N, useValue: zh_CN },
    httpInterceptorProviders,
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
