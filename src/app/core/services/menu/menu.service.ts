import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuServiceBehaviorSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  changeState(value: boolean): void {
    this.menuServiceBehaviorSubject.next(value);
  }

  getState() {
    return this.menuServiceBehaviorSubject;
  }
}
