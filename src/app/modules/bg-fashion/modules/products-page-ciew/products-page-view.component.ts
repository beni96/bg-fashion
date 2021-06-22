import { Component } from '@angular/core';
import { PRODUCTS } from '../../common/products';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products-page-view',
  templateUrl: './products-page-view.component.html',
  styleUrls: ['./products-page-view.component.scss'],
})
export class ProductsPageViewComponent {
  products: Product[] = PRODUCTS;

  onProductClick(product: Product) {}
}
