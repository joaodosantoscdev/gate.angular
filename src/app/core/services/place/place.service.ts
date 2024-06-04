import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaceResponse } from '../../models/place/place-reponse.model';
import { EMPTY, Observable, catchError, take } from 'rxjs';
import { Route, Router } from '@angular/router';
import { emnviroment } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getAllPlaces(): Observable<PlaceResponse[]> {
    return this.httpClient.get<PlaceResponse[]>(`${emnviroment.api}/Place`)
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
