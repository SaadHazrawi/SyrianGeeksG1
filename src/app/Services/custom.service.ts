import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomService {
constructor(private http: HttpClient ) { }

public getRequests<T>(url: string): Observable<T> {
  return this.http.get<T>(url)
    .pipe(catchError(this.handleError.bind(this)));
}

public postRequest<T>(url: string, data: any): Observable<T> {
  return this.http.post<T>(url, data)
    .pipe(catchError(this.handleError.bind(this)));
}

public putRequest<T>(url: string, data: any): Observable<T> {
  return this.http.put<T>(url, data)
  .pipe(catchError(this.handleError.bind(this)));
}

public deleteRequest<T>(url: string): Observable<T> {
  return this.http.delete<T>(url)
    .pipe(catchError(this.handleError.bind(this)));
}
handleError(error: HttpErrorResponse) {
  let errorMessage: string = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    errorMessage = ` client-side error` + error.error.message;
  } else {
    // server-side error
    errorMessage = `server-side error ${error.status} Message:${error.message}`;
  }
  return throwError(() => errorMessage);
}
}
