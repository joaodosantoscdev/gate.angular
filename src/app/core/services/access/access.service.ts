import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessResponse } from '../../models/access/access-response.model';
import { EMPTY, Observable, catchError, take } from 'rxjs';
import { emnviroment } from 'src/app/shared';
import { Router } from '@angular/router';

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
        take(1)
    );
  }
}
