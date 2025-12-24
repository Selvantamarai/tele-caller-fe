import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ANIMATION_TYPES, INg2LoadingSpinnerConfig } from '../ng2-loading-spinner';

@Component({
  standalone: false,
selector: 'app-modal-right',
  templateUrl: './modal-right.component.html',
  styleUrls: ['./modal-right.component.scss']
})
export class ModalRightComponent {

  @Input() viewClass: string = '';
  @Input() width: number = 50;
  @Input() showSpinner: boolean = false;
  @Input() showFooter: boolean = true;
  @Input() loadingConfig: INg2LoadingSpinnerConfig = {
    animationType: ANIMATION_TYPES.dualCircle,
    backdropColor: 'rgba(0, 0, 0, 0.3)',
    spinnerColor: '#fff',
    spinnerPosition: 'center',
    backdropBorderRadius: '15px',
    spinnerSize: 'md',
    spinnerFontSize: '2rem',
  };

  @Output() closeModalRight: EventEmitter<boolean> = new EventEmitter();
  isShow: boolean = false;

  constructor() { }

  show() {
    this.viewClass = 'show';
    this.isShow = true;
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  hide() {
    this.isShow = false;
    this.viewClass = '';
    this.showSpinner = false;
    this.closeModalRight.emit(true);
    document.getElementsByTagName('body')[0].style.overflow = 'scroll';
  }

  showSpin() {
    this.showSpinner = true;
  }

  closeSpin() {
    this.showSpinner = false;
  }

}
