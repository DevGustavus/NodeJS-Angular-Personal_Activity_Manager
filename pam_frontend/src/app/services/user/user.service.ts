import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = `${environment.api}/user`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
