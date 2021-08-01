import { trigger, transition, style, animate, group } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { isEnterOrSpacePressed } from 'src/app/common/utils/utils';
import { BgFashionPath, BG_FASHION_PREFIX } from 'src/app/modules/bg-fashion/router/bg-fashion.routes.names';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { HEADER_CATEGORIES } from '../../common/header-categories';
import { HeaderCategory } from '../../interfaces/header-category';

const MOBILE_LAYOUT_MAX_WIDTH = 760;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('100ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
    trigger('mobileMenuAnimation', [
      transition(':enter', [
        style({ opacity: 0, width: 0 }),
        group([animate('150ms', style({ opacity: 1 })), animate('200ms', style({ width: '320px' }))]),
      ]),
      transition(':leave', [group([animate('150ms', style({ opacity: 0 })), animate('200ms', style({ width: 0 }))])]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isScrolled = false;
  pages: HeaderCategory[] = HEADER_CATEGORIES;
  currentHoveredPage: HeaderCategory;
  isMobile = false;
  isMobileMenuOpen = false;

  @ViewChild('menuIcon') menuIcon: ElementRef;
  @ViewChild('mobileMenu', { read: ElementRef }) mobileMenu: ElementRef;

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

    window.addEventListener('click', (event: Event) => {
      if (!this.isMobile) {
        return;
      }

      // Closes the menu in case of clicking anywhere outside the menu.
      const isEventInsideMenu = event.composedPath().includes(this.mobileMenu?.nativeElement);
      const isEventInsideMenuIcon = event.composedPath().includes(this.menuIcon?.nativeElement);
      if (this.isMobileMenuOpen && !(isEventInsideMenu || isEventInsideMenuIcon)) {
        this.hideMobileMenu();
      }
    });
  }

  ngAfterViewInit() {
    this.isMobile = this.isMobileLayout();
    window.addEventListener('resize', () => {
      return (this.isMobile = this.isMobileLayout());
    });
  }

  isMobileLayout() {
    return document.body.clientWidth <= MOBILE_LAYOUT_MAX_WIDTH;
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

  toggleMobileMenu(event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  hideMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
