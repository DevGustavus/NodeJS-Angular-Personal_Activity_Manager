import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = `${environment.api}/category`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCategoryById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  createCategory(category: any): Observable<any> {
    return this.http.post(this.apiUrl, category).pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(id: number, category: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, category).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(id: number): Observable<any> {
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
