import { Injectable } from '@angular/core';
import {
  Comment,
  OneComment,
  PostComment,
  OneComments,
} from '../routes/blog/pages/comment/comment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  // CommentList: Comment[] = [
  //   { id: 1, question: '如何学习形式语言与自动机？', comment: ['认真读教材'] },
  //   {
  //     id: 2,
  //     question: '有什么好的学习方法？',
  //     comment: ['认真读教材', '你好'],
  //   },
  //   { id: 3, question: '概率论学习的主要内容？', comment: ['认真读教材'] },
  // ];
  private commentUrl = 'blog/comment';

  public CommentList: Comment[] = [];

  constructor(private http: HttpClient) {
    this.getComments().subscribe((value) => {
      this.CommentList = value;
    });
  }

  // getAllComments(): Comment[] {
  //   return this.CommentList;
  // }

  getComments(): Observable<Comment[]> {
    return this.http.get<OneComments>(this.commentUrl).pipe(
      map((serverComments) => {
        const resMap: Map<string, Comment> = new Map();

        for (const serverComment of serverComments) {
          if (!resMap.has(serverComment.question)) {
            resMap.set(serverComment.question, {
              id: serverComment.id,
              question: serverComment.question,
              comments: [],
            });
          }

          resMap
            .get(serverComment.question)
            ?.comments.push(serverComment.comment);
        }

        const res: Comment[] = [];
        for (const resMapElement of resMap) {
          res.push(resMapElement[1]);
        }
        return res;
      })
    );
  }

  // getCommentsUrl(): Observable<Comment[]> {
  //   return this.http
  //     .get<Comment[]>(this.commentUrl)
  //     .pipe(catchError(this.handleError<Comment[]>('getComments', [])));
  // }
  //
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error); // log to console instead
  //     return of(result as T);
  //   };
  // }
  //
  // getComment(id: number): Observable<Comment> {
  //   const url = `${this.commentUrl}/${id}`;
  //   return this.http
  //     .get<Comment>(url)
  //     .pipe(catchError(this.handleError<Comment>(`getComment id=${id}`)));
  // }

  addQuestion(comment: OneComment): Observable<boolean> {
    const postComment: PostComment = {
      question: comment.question,
      comment: comment.comment,
    };
    return this.http.post<PostComment>(this.commentUrl, postComment).pipe(
      map(() => {
        return true;
      })
    );
  }
}
