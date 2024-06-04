import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, take, tap } from 'rxjs';
import { emnviroment } from 'src/app/shared';
import { LoginModel } from '../../models/login/login.model';
import { LoginResponse } from '../../models/login';
import { jwtDecode } from 'jwt-decode';
import { ApplicationUser } from '../../models/user/application-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: ApplicationUser;
  private _currentUserSource = new ReplaySubject<any>(1);
  public currentUser$ = this._currentUserSource.asObservable();

  constructor(private httpCLient: HttpClient) { }

  login(login: LoginModel): Observable<LoginResponse> {
    return this.httpCLient.post<LoginResponse>(`${emnviroment.api}/User/Login`, login).pipe(
      tap((tokenInfo: LoginResponse) => this._storeToken(tokenInfo)),
      take(1)
    );
  }

  private _storeToken(tokenInfo: LoginResponse): void {
    if (!this._user) {
      this.setCurrentToken(tokenInfo);
    }
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this._currentUserSource.next(null);
    this._currentUserSource.complete();
  }

  public setCurrentToken(tokenInfo: LoginResponse): void {
    const decodedToken: any = jwtDecode(tokenInfo.accessToken) as any;
    this._user = JSON.parse(decodedToken.userInfo) as ApplicationUser;

    localStorage.setItem('access_token', JSON.stringify(tokenInfo.accessToken));
    this._currentUserSource.next(tokenInfo);
  }

  public getStoragedUser(): ApplicationUser | null {
    if (this._user) {
      return this._user;
    }
    
    const token = localStorage.getItem('access_token');
    if (token) {
      const parsedToken = JSON.parse(token) as any;
      const decodedToken: any = jwtDecode(parsedToken) as any;
      this._user = JSON.parse(decodedToken.userInfo);

      return this._user;
    } else {
      this.logout();
    }

    return null;
  }
}
