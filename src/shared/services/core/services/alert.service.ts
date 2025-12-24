import { Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private injector: Injector) {}

  info(message: string) {
    if (message) this.injector.get(ToastrService).info(message, 'Information');
  }

  success(message: string) {
    if (message)
      this.injector.get(ToastrService).success(message, 'Success', {
        timeOut: 2000,
      });
  }

  warning(message: string, isHtml: boolean = false) {
    if (message)
      this.injector
        .get(ToastrService)
        .warning(message, 'Warning', { enableHtml: isHtml });
  }

  error(message: string) {
   if (message) this.injector.get(ToastrService).error(message, 'Error');
  }
}
