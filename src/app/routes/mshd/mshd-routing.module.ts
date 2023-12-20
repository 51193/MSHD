import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MshdComponent } from './mshd.component';
import { HomeComponent } from './pages/home/home.component';
import { CodesComponent } from './pages/codes/codes.component';
import { VisualizationComponent } from './pages/visualization/visualization.component';
import { MapComponent } from './pages/map/map.component';
import { UploadComponent } from './pages/upload/upload.component';
import { DetailsComponent } from './pages/codes/details/details.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { ManageComponent } from './pages/manage/manage.component';

import { UserManageComponent } from './pages/user-manage/user-manage.component';

import { DetailComponent } from './pages/manage/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: MshdComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'codes',
        component: CodesComponent,
      },
      {
        path: 'codes/:disasterId',
        component: DetailsComponent,
      },
      {
        path: 'visualization',
        component: VisualizationComponent,
      },
      {
        path: 'map',
        component: MapComponent,
      },
      {
        path: 'upload',
        component: UploadComponent,
      },
      {
        path: 'userInfo',
        component: UserInfoComponent,
      },
      {
        path: 'manage',
        component: ManageComponent,
        children: [
          {
            path: 'detail',
            component: DetailComponent,
          },
        ],
      },
      {
        path: 'user_manage',
        component: UserManageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MshdRoutingModule {}
