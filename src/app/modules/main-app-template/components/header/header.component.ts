import { Component, OnInit } from '@angular/core';
import { BgFashionPath, BG_FASHION_PREFIX } from 'src/app/modules/bg-fashion/router/bg-fashion.routes.names';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { HEADER_CATEGORIES } from '../../common/header-categories';
import { HeaderCategory } from '../../interfaces/header-category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  pages: HeaderCategory[] = HEADER_CATEGORIES;
  currentHoveredPage: HeaderCategory;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    document.addEventListener('scroll', () => {
      return (this.isScrolled = window.pageYOffset > 0);
    });

    this.productsService.getProducts().forEach((product) => {
      product.categories.forEach((category) => {
        const headerCategory = this.pages.find((page) => page.category === category);
        headerCategory
          ? (headerCategory.menuCategories = this.concatWithNoDuplicates(product.subcategories, headerCategory.menuCategories))
          : (this.pages = this.pages.concat({ category, menuCategories: product.subcategories }));
      });
    });
  }

  getHomeLink() {
    return `${BG_FASHION_PREFIX}/${BgFashionPath.Home}`;
  }

  getCartLink() {
    return `${BG_FASHION_PREFIX}/${BgFashionPath.Cart}`;
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

  private concatWithNoDuplicates(a: string[], b: string[]): string[] {
    const notDuplicateditems = b.filter((item) => a.indexOf(item) < 0);
    return a.concat(notDuplicateditems);
  }
}
