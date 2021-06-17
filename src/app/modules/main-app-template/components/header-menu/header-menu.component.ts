import { Component, Input } from '@angular/core';
import { BgFashionPath, BG_FASHION_PREFIX } from 'src/app/modules/bg-fashion/router/bg-fashion.routes.names';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent {
  @Input() category: string;
  @Input() subcategories: string[];
  @Input() imageUrl: string;

  getLink(subcategory: string) {
    return `${BG_FASHION_PREFIX}/${BgFashionPath.Category}/${this.category}/${BgFashionPath.Subcategory}/${subcategory}`;
  }
}
