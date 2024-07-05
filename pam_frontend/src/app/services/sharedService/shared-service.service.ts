import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }
  
  private newUserCreatedSource = new Subject<void>();
  private newCategoryCreatedSource = new Subject<void>();
  private newActivityCreatedSource = new Subject<void>();

  newUserCreated$ = this.newUserCreatedSource.asObservable();
  newCategoryCreated$ = this.newCategoryCreatedSource.asObservable();
  newActivityCreated$ = this.newActivityCreatedSource.asObservable();

  notifyUserCreated() {
    this.newUserCreatedSource.next();
  }

  notifyCategoryCreated() {
    this.newCategoryCreatedSource.next();
  }

  notifyActivityCreated() {
    this.newActivityCreatedSource.next();
  }
}
