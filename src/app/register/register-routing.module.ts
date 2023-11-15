import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  // {
  //   path: 'register',
  //   pathMatch: 'prefix', // forall
  //   redirectTo: 'register',
  //   component: RegisterComponent,
  //   loadChildren: () =>
  //     import('../register/register.module').then((m) => m.RegisterModule),
  // },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
