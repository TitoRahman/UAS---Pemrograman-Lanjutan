import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiURL = environment.apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient:HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'customers');
  }

  addUser(user : User): Observable<User> {
    console.log(this.apiURL)
    return this.httpClient.post<User>(
      this.apiURL + 'signup', 
      JSON.stringify(user), 
      this.httpOptions
      ).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
