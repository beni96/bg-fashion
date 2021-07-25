import { trigger, transition, style, animate, group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { BgFashionPath, BG_FASHION_PREFIX } from 'src/app/modules/bg-fashion/router/bg-fashion.routes.names';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { HEADER_CATEGORIES } from '../../common/header-categories';
import { HeaderCategory } from '../../interfaces/header-category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [style({ opacity: 0 }), group([animate('100ms', style({ opacity: 1 }))])]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  pages: HeaderCategory[] = HEADER_CATEGORIES;
  currentHoveredPage: HeaderCategory;

  constructor(private productsService: ProductsService, private favoritesService: FavoritesService, private cartService: CartService) {}

  ngOnInit() {
    document.addEventListener('scroll', () => {
      return (this.isScrolled = window.pageYOffset > 0);
    });

    this.productsService.getCategoriesSubject().subscribe((categories) => {
      categories.forEach((category) => {
        const existPage = this.pages.find((page) => page.category === category);
        const subcategories = this.productsService.getSubcategories(category);
        existPage
          ? (existPage.menuCategories = subcategories)
          : (this.pages = this.pages.concat({ category, menuCategories: subcategories }));
      });
    });
  }

  getHomeLink() {
    return `${BG_FASHION_PREFIX}/${BgFashionPath.Home}`;
  }

  getCartLink() {
    return `${BG_FASHION_PREFIX}/${BgFashionPath.Cart}`;
  }

  getFavoritesLink() {
    return `${BG_FASHION_PREFIX}/${BgFashionPath.Favorites}`;
  }

  getLink(category: string) {
    return `${BG_FASHION_PREFIX}/${BgFashionPath.Category}/${category}`;
  }

  showHeaderMenu(page: HeaderCategory) {
    this.currentHoveredPage = page;
  }

  hideHeaderMenu() {
    this.currentHoveredPage = null;
  }

  getFavoriteProductsCount() {
    return this.favoritesService.getFavoriteProducts().length;
  }

  getCartProductsCount() {
    return this.cartService.getExtendedCartProducts().length;
  }
}
