import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isEnterOrSpacePressed } from 'src/app/modules/bg-fashion/common/utils';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss'],
})
export class QuantityComponent {
  @Input() quantity: number;
  @Output() quantityChanged = new EventEmitter<number>();

  onQuantityChange(quantity: number, event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    if (quantity < 1 || quantity > 15) {
      return;
    }

    this.quantityChanged.emit(quantity);
  }
}
