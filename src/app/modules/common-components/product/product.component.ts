import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isEnterOrSpacePressed } from '../../bg-fashion/common/utils';
import { ColorWithImages } from '../../bg-fashion/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() title: string;
  @Input() colorsWithImages: ColorWithImages[] = [];
  @Input() defaultColorIndex: number;
  @Input() previousPrice: number;
  @Input() price: number;
  @Input() imgHeight: number;

  @Output() productClicked = new EventEmitter<number>();

  selectedColorWithImages: ColorWithImages;

  ngOnInit() {
    this.defaultColorIndex = this.defaultColorIndex || 0;
    this.selectedColorWithImages = this.colorsWithImages[this.defaultColorIndex] || this.colorsWithImages[0];
  }

  shouldShowColors() {
    return this.colorsWithImages.length > 1;
  }

  getDiscount() {
    return (((this.previousPrice - this.price) * 100) / this.previousPrice).toFixed();
  }

  onColorSelect(colorWithImages: ColorWithImages) {
    this.selectedColorWithImages = colorWithImages;
  }

  isSelectedColor(colorWithImages: ColorWithImages) {
    return colorWithImages.color.hexCode === this.selectedColorWithImages.color.hexCode;
  }

  onProductClick(event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    const selectedColorIndex = this.colorsWithImages.findIndex(
      (colorWithImages) => colorWithImages.color.hexCode === this.selectedColorWithImages.color.hexCode
    );
    const colorIndexQueryParam = selectedColorIndex === this.defaultColorIndex ? null : selectedColorIndex || 0;
    this.productClicked.emit(colorIndexQueryParam);
  }
}
