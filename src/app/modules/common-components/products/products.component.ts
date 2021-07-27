import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product';
import { getImgHeight } from 'src/app/common/utils/utils';

const IMAGE_PADDING = 32;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() showHeart = false;
  @Input() showTrash = false;

  @Output() productClicked = new EventEmitter<{ productId: number; selectedColorIndex: number }>();
  @Output() heartClicked = new EventEmitter<{ productId: number; isFavorite: boolean }>();
  @Output() trashClicked = new EventEmitter<number>();

  imgHeight: number;

  constructor(private hostElement: ElementRef) {}

  ngOnInit() {
    setTimeout(() => this.getImgHeight(), 0);
    window.addEventListener('resize', () => this.getImgHeight());
  }

  getImgHeight() {
    const screenWidth = window.innerWidth;
    const totalWidth = this.hostElement.nativeElement.offsetWidth;
    this.imgHeight = getImgHeight(totalWidth, IMAGE_PADDING, screenWidth);
  }

  onProductClick(productId: number, selectedColorIndex: number) {
    this.productClicked.emit({ productId, selectedColorIndex });
  }

  onHeartClick(productId: number, isFavorite: boolean) {
    this.heartClicked.emit({ productId, isFavorite });
  }

  onTrashClick(productId: number) {
    this.trashClicked.emit(productId);
  }
}
