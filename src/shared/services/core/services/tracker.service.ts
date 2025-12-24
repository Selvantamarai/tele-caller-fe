import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  private currentComponentSubject = new BehaviorSubject<string>('');
  public currentComponent$: Observable<string> = this.currentComponentSubject.asObservable();

  setCurrentComponent(component: string): void {
    this.currentComponentSubject.next(component);
  }
}
