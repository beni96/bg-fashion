import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
  @Input() category: string;
  @Input() subcategory: string;
  @Input() colors: string[] = [];
  @Input() sizes: string[] | number[] = [];
  @Input() categoryOptions: string[] = [];
  @Input() subcategoryOptions: string[] = [];
  @Input() colorOptions: string[] = [];
  @Input() sizeOptions: string[] = [];

  @Output() categorySelected = new EventEmitter<string>();
  @Output() subcategorySelected = new EventEmitter<string>();
  @Output() colorSelected = new EventEmitter<string[]>();
  @Output() sizeSelected = new EventEmitter<string[] | number[]>();

  onCategorySelect(value: string) {
    this.categorySelected.emit(value);
  }

  onSubcategorySelect(value: string) {
    this.subcategorySelected.emit(value);
  }

  onColorSelect(value: string[]) {
    this.colorSelected.emit(value);
  }

  onSizeSelect(value: string[] | number[]) {
    this.sizeSelected.emit(value);
  }
}
