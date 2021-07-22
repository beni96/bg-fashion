import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { isEnterOrSpacePressed } from '../../../common/utils/utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() options: string[] | number[];
  @Input() value: string | number;
  @Input() multipleValue: any[] = [];
  @Input() placeholder: string;
  @Input() label: string;
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() multiple = false;
  @Input() errorMessage: string;
  @Output() optionSelected = new EventEmitter<any>();

  @ViewChild('select') select: ElementRef<HTMLSelectElement>;

  constructor(private host: ElementRef) {}

  isOpen = false;

  ngOnInit() {
    window.addEventListener('click', (event: Event) => {
      const isEventInsideElement = event.composedPath().includes(this.host.nativeElement);
      if (this.isOpen && !isEventInsideElement) {
        this.toggleMenu();
      }
    });
  }

  isOptionSelected(value: string | number) {
    if (this.multiple) {
      return this.multipleValue?.includes(value);
    }

    return this.value === value;
  }

  toggleMenu(event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    this.isOpen = !this.isOpen;
  }

  onOptionSelect(value: string | number, event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    if (this.multiple) {
      const valueIndex = this.multipleValue?.indexOf(value);
      this.multipleValue = this.multipleValue || [];
      valueIndex >= 0 ? this.multipleValue.splice(valueIndex, 1) : this.multipleValue.push(value);
    } else {
      this.value = value;
      this.toggleMenu();
    }

    this.select.nativeElement.dispatchEvent(new Event('input', { bubbles: true, composed: false }));
    this.optionSelected.emit(this.multiple ? this.multipleValue : this.value);
  }
}
