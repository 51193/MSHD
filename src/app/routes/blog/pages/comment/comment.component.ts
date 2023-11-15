import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from './comment';
import { CommentService } from '../../../../services/comment.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less'],
})
export class CommentComponent implements OnInit {
  constructor(private router: Router, private commentService: CommentService) {
    // this.comments = this.commentService.getAllComments();
  }

  public comments$ = new BehaviorSubject<Comment[]>([]);

  ngOnInit() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments$.next(comments);
    });

    return;
  }

  navigateTo(targetRoute: string): void {
    // 使用 Router 服务的 navigate 方法导航到目标路由
    this.router.navigate([targetRoute]);
  }

  multiLineText = '';

  addQuestion() {
    if (this.multiLineText) {
      const temp = this.comments$.value;
      temp.push({
        id: this.comments$.value.length + 1,
        question: this.multiLineText,
        comments: [],
      });
      this.comments$.next(temp);
      this.commentService
        .addQuestion({
          id: this.comments$.value.length,
          question: this.multiLineText,
          comment: '',
        })
        .subscribe();
    }
  }
}
