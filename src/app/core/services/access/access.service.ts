import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessResponse } from '../../models/access/access-response.model';
import { EMPTY, Observable, catchError, take, tap } from 'rxjs';
import { emnviroment } from 'src/app/shared';
import { Router } from '@angular/router';
import { FastAccessRequest } from '../../models/access/fast-access.model';

@Injectable({
  providedIn: 'root'
})
export class AccessService {


  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getAccesses(): Observable<AccessResponse[]> {
    return this.httpClient.get<AccessResponse[]>(`${emnviroment.api}/Access/GetAccesses`)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          console.error(`Error: ${JSON.stringify(e.error)} - Status: ${e.statusText} - ${e.status}; Message: ${e.message}`)
          this.router.navigate(['login']);
          return EMPTY;
        }),
        take(1));
  }

  getLastAccessByDocumentNumber(documentNumber: string): Observable<AccessResponse> {
    return this.httpClient.get<AccessResponse>(`${emnviroment.api}/Access/GetLastAccessByDocumentNumber?documentNumber=${documentNumber}`)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          console.error(`Error: ${JSON.stringify(e.error)} - Status: ${e.statusText} - ${e.status}; Message: ${e.message}`)
          this.router.navigate(['login']);
          return EMPTY;
        }),
        take(1));
  }

  insertFastAccess(fastAccess: FastAccessRequest): Observable<AccessResponse> {
    return this.httpClient.post<AccessResponse>(`${emnviroment.api}/Access/InsertFastAccess`, fastAccess)
      .pipe(take(1));
  }

  getFullById(id: number): Observable<AccessResponse> {
    return this.httpClient.get<AccessResponse>(`${emnviroment.api}/Access/getFullById?id=${id}`)
      .pipe(take(1));
  }
}
