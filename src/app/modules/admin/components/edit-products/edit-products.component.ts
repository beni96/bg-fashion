import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss'],
})
export class EditProductsComponent {
  @Input() products: Product[] = [];
  @Output() productChanged = new EventEmitter<{ product: Product; index: number }>();
  @Output() productRemoved = new EventEmitter<number>();
  @Output() productAdded = new EventEmitter<Product>();

  selectedProductIndex: number;
  selectedProduct: Product;
  isAddProductClicked = false;

  getSelectOptions() {
    return this.products.map((categoryLink) => categoryLink.id);
  }

  onSelect(option: number) {
    this.selectedProductIndex = this.products.findIndex((categoryLink) => option === categoryLink.id);
    this.selectedProduct = this.products[this.selectedProductIndex];
  }

  onAddProductButtonClick() {
    this.isAddProductClicked = true;
  }

  onProductChange(product: Product) {
    this.productChanged.emit({ product, index: this.selectedProductIndex });
    this.resetForm();
  }

  onProductRemove() {
    this.productRemoved.emit(this.selectedProductIndex);
    this.resetForm();
  }

  onProductAdd(product: Product) {
    this.productAdded.emit(product);
    this.resetForm();
  }

  private resetForm() {
    this.isAddProductClicked = false;
    this.selectedProduct = null;
    this.selectedProductIndex = null;
  }
}
