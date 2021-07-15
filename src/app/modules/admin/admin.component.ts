import { Component } from '@angular/core';
import { CategoryLink } from 'src/app/common/interfaces/category-link';
import { Product } from 'src/app/common/interfaces/product';
import { HomePageService } from 'src/app/services/home-page-service/home-page.service';
import { ProductsService } from 'src/app/services/products-service/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(private homePageService: HomePageService, private productsServcie: ProductsService) {}

  onCategoryLinkChange(event: { categoryLink: CategoryLink; index: number }) {
    this.homePageService.setCategoryLink(event.categoryLink, event.index);
  }

  getCategoryLinks() {
    return this.homePageService.getCategoryLinks() || [];
  }

  getProducts() {
    return this.productsServcie.getProducts();
  }

  onProductAdd(product: Product) {
    this.productsServcie.addProduct(product);
  }

  onProductChange(event: { product: Product; index: number }) {
    this.productsServcie.setProduct(event.product, event.index);
  }

  onProductRemove(index: number) {
    this.productsServcie.removeProduct(index);
  }
}
