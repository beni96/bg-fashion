import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isEnterOrSpacePressed } from 'src/app/modules/bg-fashion/common/utils';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class SizeComponent {
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() isSelected: boolean;
  @Output() sizeSelected = new EventEmitter<void>();

  onSizeSelect(event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    if (this.disabled) {
      return;
    }

    this.sizeSelected.emit();
  }
}
