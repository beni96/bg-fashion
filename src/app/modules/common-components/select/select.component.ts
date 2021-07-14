import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { isEnterOrSpacePressed } from '../../bg-fashion/common/utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() options: string[] | number[];
  @Input() value: string | number;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Output() optionSelected = new EventEmitter<string | number>();

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

    this.select.nativeElement.value = value as string;
    this.select.nativeElement.dispatchEvent(new Event('input', { bubbles: true, composed: false }));
    this.optionSelected.emit(value);
    this.value = value;
    this.toggleMenu();
  }
}
