import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogContentComponent } from './pages/blog-content/blog-content.component';
import { BlogComponent } from './blog.component';
import { BlogWelcomeComponent } from './pages/blog-welcome/blog-welcome.component';
import { CommentComponent } from './pages/comment/comment.component';
import { SubcommentComponent } from './pages/subcomment/subcomment.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'welcome',
        component: BlogWelcomeComponent,
      },
      {
        path: ':userName/file/:filePath',
        component: BlogContentComponent,
      },
      {
        path: 'comment',
        component: CommentComponent,
      },
      {
        path: 'subcomment/:id',
        component: SubcommentComponent,
      },
      {
        path: '**',
        // pathMatch: 'prefix',
        redirectTo: 'welcome',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
