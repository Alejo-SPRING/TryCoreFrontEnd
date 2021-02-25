import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EndPoints } from '../helpers/end-points';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http : HttpClient) { }

  public getPersonas(): Observable<any>{
    return this.http.get(EndPoints.endPoint + "personas/all").pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

  public updateContador(personaId: number): Observable<any>{
    return this.http.put(EndPoints.endPoint + "personas/contador/" + personaId, null).pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

  public getTop3(): Observable<any>{
    return this.http.get(EndPoints.endPoint + "personas/top3").pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

}
