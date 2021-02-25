import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EndPoints } from '../helpers/end-points';

@Injectable({
  providedIn: 'root'
})
export class PlanetasService {

  constructor(private http : HttpClient) { }

  public getPlanetas(): Observable<any>{
    return this.http.get(EndPoints.endPoint + "planetas/all").pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

  public updateContador(planetaId : number): Observable<any>{
    return this.http.put(EndPoints.endPoint + "planetas/contador/" + planetaId, null).pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

  public top3(): Observable<any>{
    return this.http.get(EndPoints.endPoint + "planetas/top3").pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }
}
