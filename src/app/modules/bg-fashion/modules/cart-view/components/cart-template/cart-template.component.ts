import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartStep } from '../../cart-view.component';

@Component({
  selector: 'app-cart-template',
  templateUrl: './cart-template.component.html',
  styleUrls: ['./cart-template.component.scss'],
})
export class CartTemplateComponent {
  @Input() currentStep: CartStep;
  @Input() isLoading = false;

  @Output() cancelClicked = new EventEmitter<void>();
  @Output() backClicked = new EventEmitter<void>();
  @Output() nextClicked = new EventEmitter<void>();

  cartStep = CartStep;

  getTitle() {
    switch (this.currentStep) {
      case CartStep.DETAILS:
        return 'Fill in your details';
      case CartStep.SUMMARY:
        return 'Summary';
      default:
        return 'Cart';
    }
  }

  onCancelClick() {
    this.cancelClicked.emit();
  }

  onBackClick() {
    this.backClicked.emit();
  }

  onNextClick() {
    this.nextClicked.emit();
  }
}
