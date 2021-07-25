import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss'],
})
export class EditProductsComponent {
  @Input() products: Product[] = [];
  @Output() productChanged = new EventEmitter<Product>();
  @Output() productRemoved = new EventEmitter<number>();
  @Output() productAdded = new EventEmitter<Product>();

  selectedProduct: Product;
  isAddProductClicked = false;

  getSelectOptions() {
    return this.products.map((categoryLink) => categoryLink.id);
  }

  onSelect(selectedId: number) {
    this.selectedProduct = this.products.find(product => product.id === selectedId);
  }

  onAddProductButtonClick() {
    this.isAddProductClicked = true;
  }

  onProductChange(product: Product) {
    this.productChanged.emit(product);
    this.resetForm();
  }

  onProductRemove() {
    this.productRemoved.emit(this.selectedProduct.id);
    this.resetForm();
  }

  onProductAdd(product: Product) {
    this.productAdded.emit(product);
    this.resetForm();
  }

  private resetForm() {
    this.isAddProductClicked = false;
    this.selectedProduct = null;
  }
}
