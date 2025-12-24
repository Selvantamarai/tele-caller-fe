import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  
  private readonly sidNav = new Subject<boolean>();
  readonly sidNav$ = this.sidNav.asObservable();
  public isCollapsed: boolean = false;
  isSidebarPinned = false;
  isSidebarToggeled = false;

  constructor() {}

  toggleSidebar() {
    this.isSidebarToggeled = !this.isSidebarToggeled;
  }

  toggleSidebarPin() {
    this.isSidebarPinned = !this.isSidebarPinned;
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled,
    };
  }

  onSidebarToggle() {
    this.sidNav.next(this.isCollapsed);
  }
}
