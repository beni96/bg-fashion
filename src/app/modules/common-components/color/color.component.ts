import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isEnterOrSpacePressed } from '../../bg-fashion/common/utils';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent {
  @Input() name: string;
  @Input() hexCode: string;
  @Input() isSelected: boolean;
  @Output() colorSelected = new EventEmitter<void>();

  onColorSelect(event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    this.colorSelected.emit();
  }
}
