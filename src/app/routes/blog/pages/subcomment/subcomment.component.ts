import { Component, Input, inject, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { Comment } from '../comment/comment';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../../services/comment.service';
import {
  BehaviorSubject,
  filter,
  map,
  ReplaySubject,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-subcomment',
  templateUrl: './subcomment.component.html',
  styleUrls: ['./subcomment.component.less'],
})
export class SubcommentComponent implements OnInit {
  multiLineText = '';

  public comments$ = new BehaviorSubject<{
    question: string;
    comments: string[];
  }>({ question: '', comments: [] });
  public id$ = new ReplaySubject<number>(1);

  public startComments() {
    this.id$
      .pipe(
        switchMap((id) => {
          return this.commentService.getComments().pipe(
            map(
              (
                comments
              ): {
                question: string;
                comments: string[];
              } => {
                for (const comment of comments) {
                  if (comment.id != id) {
                    continue;
                  }

                  return {
                    question: comment.question,
                    comments: comment.comments,
                  };
                }
                return { question: '', comments: [] };
              }
            )
          );
        })
      )
      .subscribe((value) => {
        this.comments$.next(value);
      });
  }

  ngOnInit() {
    this.startComments();
    return;
  }

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private commentService: CommentService
  ) {
    const commentId = Number(this.route.snapshot.params['id']);

    this.route.paramMap
      .pipe(
        map((params: ParamMap): number | null => {
          return Number(params.get('id'));
        }),
        filter((id): id is number => {
          return id != null;
        })
      )
      .subscribe((id) => {
        console.log(id);
        this.id$.next(id);
      });
  }

  saveData() {
    if (this.multiLineText != '') {
      const t = this.comments$.value;
      console.log(t);
      t.comments.push(this.multiLineText);
      this.comments$.next(t);

      this.commentService
        .addQuestion({
          id: 1,
          question: t.question,
          comment: this.multiLineText,
        })
        .subscribe({
          error: () => {
            return;
          },
        });
    }
    // this.commentService
    //   .addComment(this.comment as Comment)
    //   .subscribe((comment) => {
    //     this.comment?.comments?.push(this.multiLineText);
    //   });
  }
}
