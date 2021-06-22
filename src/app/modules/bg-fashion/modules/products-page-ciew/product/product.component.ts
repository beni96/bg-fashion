import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ColorWithImages } from '../../../interfaces/product';

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

  selectedColorWithImages: ColorWithImages;

  ngOnInit() {
    this.selectedColorWithImages = this.colorsWithImages[this.defaultColorIndex || 0] || this.colorsWithImages[0];
  }

  shouldShowColors() {
    return this.colorsWithImages.length > 1;
  }

  getDiscount() {
    return (((this.previousPrice - this.price) * 100) / this.previousPrice).toFixed();
  }

  onColorSelected(colorWithImages: ColorWithImages) {
    this.selectedColorWithImages = colorWithImages;
  }

  isSelectedColor(colorWithImages: ColorWithImages) {
    return colorWithImages.color.hexCode === this.selectedColorWithImages.color.hexCode;
  }
}
