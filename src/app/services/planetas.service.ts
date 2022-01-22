import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanetasService {

  constructor(private http : HttpClient) { }

  public getPlanetas(): Observable<any>{
    return this.http.get(environment.endPoint + "planetas/all").pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

  public updateContador(planetaId : number): Observable<any>{
    return this.http.put(environment.endPoint + "planetas/contador/" + planetaId, null).pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

  public top3(): Observable<any>{
    return this.http.get(environment.endPoint + "planetas/top3").pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }
}
