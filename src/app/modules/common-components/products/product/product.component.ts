import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { isEnterOrSpacePressed } from '../../../../common/utils/utils';
import { ColorWithImages } from '../../../../common/interfaces/product';
import { GoogleAnalyticsEvent } from 'src/app/common/events/analytics-events';
import { FIREBASE_TOKEN } from 'src/app/tokens/firebase/firebase-token';

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
  @Input() showTrash = false;
  @Input() showHeart = false;
  @Input() isFavorite = false;

  @Output() productClicked = new EventEmitter<number>();
  @Output() heartClicked = new EventEmitter<boolean>();
  @Output() trashClicked = new EventEmitter<void>();

  selectedColorWithImages: ColorWithImages;

  constructor(@Inject(FIREBASE_TOKEN) private firebaseService) {}

  ngOnInit() {
    this.defaultColorIndex = this.defaultColorIndex || 0;
    this.selectedColorWithImages = this.colorsWithImages[this.defaultColorIndex] || this.colorsWithImages[0];
  }

  shouldShowColors() {
    return this.colorsWithImages.length > 1;
  }

  getDiscount() {
    const discount = ((this.previousPrice - this.price) * 100) / this.previousPrice;
    return Math.floor(discount).toString();
  }

  onColorSelect(colorWithImages: ColorWithImages) {
    this.selectedColorWithImages = colorWithImages;
    this.firebaseService.analytics().logEvent(GoogleAnalyticsEvent.ProductColorChanged);
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

  onHeartClick(event: Event) {
    this.isFavorite = !this.isFavorite;
    this.heartClicked.emit(this.isFavorite);
    event.preventDefault();
    event.stopPropagation();
  }

  onTrashClick(event: Event) {
    this.trashClicked.emit();
    event.preventDefault();
    event.stopPropagation();
  }
}
