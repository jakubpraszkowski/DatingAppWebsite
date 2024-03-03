import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private selectedTabSource = new BehaviorSubject<number>(0);
  currentTab = this.selectedTabSource.asObservable();

  constructor() { }

  changeTab(tabIndex: number) {
    this.selectedTabSource.next(tabIndex);
  }
}
