import { Injectable } from '@angular/core';
import { emnviroment } from 'src/app/shared';
import { AccessResponse } from '../../models/access/access-response.model';
import { ResidentResponse } from '../../models';
import { EMPTY, Observable, catchError, take } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getAllResidents(): Observable<ResidentResponse[]> {
    return this.httpClient.get<ResidentResponse[]>(`${emnviroment.api}/Resident/GetAllResidentsWithContact`)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          console.error(`Error: ${JSON.stringify(e.error)} - Status: ${e.statusText} - ${e.status}; Message: ${e.message}`)
          this.router.navigate(['login']);
          return EMPTY;
        }),
        take(1));
  }

  getById(id: number): Observable<ResidentResponse> {
    return this.httpClient.get<ResidentResponse>(`${emnviroment.api}/Resident/GetFullById?id=${id}`)
      .pipe(
        catchError((e: HttpErrorResponse) => {
          console.error(`Error: ${JSON.stringify(e.error)} - Status: ${e.statusText} - ${e.status}; Message: ${e.message}`)
          this.router.navigate(['login']);
          return EMPTY;
        }),
        take(1));
  }
}
