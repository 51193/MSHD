import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfos } from '../interfaces/user';
import { BehaviorSubject, first, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public curUid$ = new BehaviorSubject<string | null>(null);

  getUserInfos$() {
    return this.httpClient.get<UserInfos>('user/user-infos');
  }

  login$(uid: string, password: string) {
    const postInfo = {
      uid: uid,
      password: password,
    };

    return this.httpClient
      .post<{ result: boolean }>('user/login', postInfo)
      .pipe(
        map((res) => {
          return res.result;
        }),
        tap((res) => {
          console.log(res);
          if (res === true) {
            this.curUid$.next(uid);
          }
        })
      );
  }

  changePassword$(password: string, newPassword: string) {
    return this.httpClient
      .post<{ result: boolean }>('user/update_password', {
        uid: this.curUid$.value,
        //uid: uid,
        password: password,
        newPassword: newPassword,
      })
      .pipe(
        map((res) => {
          return res.result;
        })
      );
  }
  deleteUser$(uid: string, password: string, deleteUser: string) {
    return this.httpClient
      .post<{ result: boolean }>('user/delete_user', {
        //uid: this.curUid$.value,
        uid: uid,
        password: password,
        deleteUser: deleteUser,
      })
      .pipe(
        map((res) => {
          return res.result;
        })
      );
  }

  addUser$(
    adminId: string,
    adminPassword: string,
    uid: string,
    password: string
  ) {
    return this.httpClient
      .post<{ result: boolean }>('user/add_user', {
        //uid: this.curUid$.value,
        adminId: adminId,
        adminPassword: adminPassword,
        uid: uid,
        password: password,
      })
      .pipe(
        map((res) => {
          return res.result;
        })
      );
  }
}
