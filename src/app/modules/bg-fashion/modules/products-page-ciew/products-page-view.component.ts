import { Component, ElementRef, OnInit } from '@angular/core';
import { PRODUCTS } from '../../common/products';
import { Product } from '../../interfaces/product';

const IMAGES_NUM_IN_ROW = 4;
const IMAGE_PADDING = 32;

@Component({
  selector: 'app-products-page-view',
  templateUrl: './products-page-view.component.html',
  styleUrls: ['./products-page-view.component.scss'],
})
export class ProductsPageViewComponent implements OnInit {
  products: Product[] = PRODUCTS;
  imgHeight: number;

  constructor(private hostElement: ElementRef) {}

  ngOnInit() {
    this.getImgHeight();
    window.addEventListener('resize', () => this.getImgHeight());
  }

  onProductClick(product: Product) {}

  getImgHeight() {
    const totalWidth = this.hostElement.nativeElement.offsetWidth;
    const imageWidth = totalWidth / IMAGES_NUM_IN_ROW - IMAGE_PADDING;
    const imageRatio = 4 / 3;
    this.imgHeight = imageWidth * imageRatio;
  }
}
