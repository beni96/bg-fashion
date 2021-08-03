import { Component, Inject, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { GoogleAnalyticsEvent } from 'src/app/common/events/analytics-events';
import { CategoryLink } from 'src/app/common/interfaces/category-link';
import { Product } from 'src/app/common/interfaces/product';
import { HomePageService } from 'src/app/services/home-page-service/home-page.service';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { FIREBASE_TOKEN } from 'src/app/tokens/firebase/firebase-token';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    @Inject(FIREBASE_TOKEN) private firebaseService,
    private homePageService: HomePageService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.firebaseService.analytics().logEvent(GoogleAnalyticsEvent.AdminPageInit);
  }

  onCategoryLinkChange(event: { categoryLink: CategoryLink; index: number }) {
    this.homePageService.setCategoryLink(event.categoryLink, event.index);
    this.firebaseService.analytics().logEvent(GoogleAnalyticsEvent.HomeImageChanged);
  }

  getCategoryLinks() {
    return this.homePageService.getCategoryLinks() || [];
  }

  getProducts() {
    return this.productsService.getProducts();
  }

  onProductAdd(product: Product) {
    this.productsService.addProduct(product);
    this.firebaseService.analytics().logEvent(GoogleAnalyticsEvent.productAdded);
  }

  onProductChange(product: Product) {
    this.productsService.setProduct(product);
    this.firebaseService.analytics().logEvent(GoogleAnalyticsEvent.productEdited);
  }

  onProductRemove(id: number) {
    this.productsService.removeProduct(id);
    this.firebaseService.analytics().logEvent(GoogleAnalyticsEvent.ProductRemoved);
  }
}
