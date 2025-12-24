import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ModalRightComponent } from './modal-right.component';
import { Ng2LoadingSpinnerModule } from '../ng2-loading-spinner';

@NgModule({
  imports: [
    CommonModule, 
    Ng2LoadingSpinnerModule,
  ],
  declarations: [ModalRightComponent],
  exports: [ModalRightComponent],
})
export class ModalRightModule { }
