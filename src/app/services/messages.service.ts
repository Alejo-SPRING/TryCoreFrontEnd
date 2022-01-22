import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  public findAllMessagesSendTo(planetId: number): Observable<any>{
    return this.http.get(environment.endPoint + "messages/findAll/" + planetId).pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

  public sendMessage(message: any): Observable<any>{
    return this.http.post(environment.endPoint + "messages/send", message).pipe(
      catchError(
        error => {
          return throwError(error);
        }
      )
    );
  }

}
