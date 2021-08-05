import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() size: 'lg' | 'md' = 'md';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() isLoading = false;

  onClick(event: Event) {
    if (this.disabled || this.isLoading) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  getButtonClasses() {
    const loadingClass = this.isLoading ? 'loading' : '';
    return `${this.color} ${this.size} ${loadingClass}`;
  }
}
