import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, take, tap } from 'rxjs';
import { emnviroment } from 'src/app/shared';
import { LoginModel } from '../../models/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSource = new ReplaySubject<any>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpCLient: HttpClient) { }

  login(login: LoginModel): Observable<any> {
    return this.httpCLient.post(`${emnviroment.api}/User/Login`, login).pipe(
      tap((tokenInfo: any) => this._storeToken(tokenInfo)),
      take(1)
    );
  }

  private _storeToken(tokenInfo: any): void {
    const user = tokenInfo;
    localStorage.setItem('user', JSON.stringify(user));

    if (user) {
      this.setCurrentUser(user);
    }
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.currentUserSource.complete();
  }

  public setCurrentUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
