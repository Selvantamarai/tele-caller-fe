import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {

    private readonly isDataChanged = new Subject<string>();
    readonly isDataChanged$ = this.isDataChanged.asObservable();

    onIsDataChanged(data: string) {
        this.isDataChanged.next(data);
      }
}
