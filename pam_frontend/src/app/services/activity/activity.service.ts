import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl: string = `${environment.api}/activity`;

  constructor(private http: HttpClient) {}

  getAllActivities(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getActivityById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  createActivity(activity: any): Observable<any> {
    return this.http.post(this.apiUrl, activity).pipe(
      catchError(this.handleError)
    );
  }

  updateActivity(id: number, activity: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, activity).pipe(
      catchError(this.handleError)
    );
  }

  deleteActivity(id: number): Observable<any> {
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
