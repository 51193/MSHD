import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BlogModule } from './routes/blog/blog.module';
import { LayoutModule } from './layout/layout.module';
import { ForgetComponent } from './forget/forget.component';
import { CommentComponent } from './routes/blog/pages/comment/comment.component';
import { SubcommentComponent } from './routes/blog/pages/subcomment/subcomment.component';
import { AuthGuard } from './services/auth.guard';
import { LayoutComponent } from './layout/layout.component';
// const routes: Routes = [
//   {
//     path: '',
//     pathMatch: 'prefix', //forall
//     loadChildren: () =>
//       import('./layout/layout.module').then((m) => m.LayoutModule),
//   },
// ];

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'register', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetComponent },
  // { path: 'comment', component: CommentComponent },
  // { path: 'subcomment/:id', component: SubcommentComponent },
  // { path: 'blog', component: LayoutComponent, canActivate: [AuthGuard] },
  // { path: '**', component: NotfoundComponent },
];
// const routes: Routes = [
//   { path: '', redirectTo: '/register', pathMatch: 'full' },
//   { path: 'register', component: RegisterComponent },
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
