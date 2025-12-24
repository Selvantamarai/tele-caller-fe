import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  standalone: false,
selector: 'app-unsubscribe',
  template: '',
})
export class Unsubscriber implements OnDestroy {
  public destroy$: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
