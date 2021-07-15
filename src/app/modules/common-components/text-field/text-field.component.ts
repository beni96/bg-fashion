import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent {
  @Input() isTextarea = false;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() errorMessage: string;
  @Input() value = '';
  @Input() type: 'text' | 'email' = 'text';
}
