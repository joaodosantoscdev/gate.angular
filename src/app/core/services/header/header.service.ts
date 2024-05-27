import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface HeaderModel {
  title: string;
  menuState?: number;
}


@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerServiceBehaviorSubject = new BehaviorSubject<HeaderModel>({title: '', menuState: 1});

  constructor() { }

  changeTitle(value: HeaderModel): void {
    this.headerServiceBehaviorSubject.next(value);
  }

  getTitle() {
    return this.headerServiceBehaviorSubject;
  }
}
