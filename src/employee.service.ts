import { Injectable, ErrorHandler} from '@angular/core';
import { environment } from './environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private apiURL = environment.apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  getEmployee(): Observable<any>{
    return this.httpClient.get(this.apiURL + '/employees').pipe(
      catchError(this.errorHandler)
    )
  }

  getEmployeeById(id: string): Observable<any>{
    return this.httpClient.get(this.apiURL + '/employees/' + id).pipe(
      catchError(this.errorHandler)
    )
  }

  createEmployee(employee: Employee): Observable<any>{
    return this.httpClient.post(this.apiURL + '/employees/add/', employee, this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  updateEmployee(employee: Employee): Observable<any>{
    return this.httpClient.patch(this.apiURL + '/employees/' + employee._id, employee, this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  deleteEmployee(id: string): Observable<any>{
    return this.httpClient.delete(this.apiURL + '/employees/' + id, this.httpOptions).pipe(
      catchError(this.errorHandler)
    )
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
