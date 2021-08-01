import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color } from 'src/app/common/interfaces/product';

@Component({
  selector: 'app-filter-bar-dialog',
  templateUrl: './filter-bar-dialog.component.html',
  styleUrls: ['./filter-bar-dialog.component.scss'],
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('100ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class FilterBarDialogComponent implements OnInit {
  @Input() category: string;
  @Input() subcategory: string;
  @Input() colors: string[];
  @Input() sizes: any[];
  @Input() categoryOptions: string[];
  @Input() subcategoryOptions: string[];
  @Input() colorOptions: Color[];
  @Input() sizeOptions: string[] | number[];

  @Output() fieldChanged = new EventEmitter<{ category: string; subcategory: string; colors: string[]; sizes: string[] | number[] }>();
  @Output() filterFinished = new EventEmitter<{ category: string; subcategory: string; colors: string[]; sizes: string[] | number[] }>();

  isOpen = false;
  selectedCategory: string;
  selectedSubcategory: string;
  selectedColors: string[] = [];
  selectedSizes: any[] = [];

  ngOnInit() {
    this.getCurrentValues();
  }

  getCurrentValues() {
    this.selectedCategory = this.category;
    this.selectedSubcategory = this.subcategory;
    this.selectedColors = this.colors ? [...this.colors] : [];
    this.selectedSizes = this.sizes ? [...this.sizes] : [];
  }

  showDialog() {
    this.isOpen = true;
  }

  hideDialog() {
    this.isOpen = false;
  }

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.selectedSubcategory = null;
    this.selectedColors = [];
    this.selectedSizes = [];
    this.fieldChanged.emit(this.getFields());
  }

  onSubcategorySelect(subcategory: string) {
    this.selectedSubcategory = this.selectedSubcategory === subcategory ? null : subcategory;
    this.selectedColors = [];
    this.selectedSizes = [];
    this.fieldChanged.emit(this.getFields());
  }

  isSelectedColor(colorName: string) {
    return this.selectedColors?.includes(colorName);
  }

  onColorSelect(colorName: string) {
    const index = this.selectedColors?.indexOf(colorName);
    index >= 0 ? this.selectedColors.splice(index, 1) : this.selectedColors.push(colorName);
    this.fieldChanged.emit(this.getFields());
  }

  isSelectedSize(size: any) {
    return this.selectedSizes?.includes(size);
  }

  onSizeSelect(size: any) {
    const index = this.selectedSizes?.indexOf(size);
    index >= 0 ? this.selectedSizes.splice(index, 1) : this.selectedSizes.push(size);
    this.fieldChanged.emit(this.getFields());
  }

  onDoneClick() {
    this.filterFinished.emit({
      category: this.selectedCategory,
      subcategory: this.selectedSubcategory,
      colors: this.selectedColors,
      sizes: this.selectedSizes,
    });
    this.hideDialog();
  }

  dismissDialog() {
    this.hideDialog();
    this.getCurrentValues();
  }

  private getFields() {
    return {
      category: this.selectedCategory,
      subcategory: this.selectedSubcategory,
      colors: this.selectedColors,
      sizes: this.selectedSizes,
    };
  }
}
