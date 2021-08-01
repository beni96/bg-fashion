import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BgFashionPath, BG_FASHION_PREFIX } from 'src/app/modules/bg-fashion/router/bg-fashion.routes.names';
import { HeaderCategory } from '../../interfaces/header-category';

@Component({
  selector: 'app-header-mobile-menu',
  templateUrl: './header-mobile-menu.component.html',
  styleUrls: ['./header-mobile-menu.component.scss'],
})
export class HeaderMobileMenuComponent {
  @Input() pages: HeaderCategory[] = [];

  @Output() linkClicked = new EventEmitter<void>();

  getLink(category: string, subcategory?: string) {
    const subcategoryPrefix = subcategory ? `${BgFashionPath.Subcategory}/${subcategory}` : '';
    return `${BG_FASHION_PREFIX}/${BgFashionPath.Category}/${category}/${subcategoryPrefix}`;
  }

  onLinkClick() {
    this.linkClicked.emit();
  }
}
