import { AfterViewInit, Component } from '@angular/core';
import { GENERAL_LINKS, SOCIAL_LINKS } from '../../common/footer-links';
import { FooterList } from '../../interfaces/footer-list';

const MOBILE_LAYOUT_MAX_WIDTH = 500;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements AfterViewInit {
  generalLinks: FooterList[] = GENERAL_LINKS;
  socialLinks: FooterList[] = SOCIAL_LINKS;
  isMobile = false;

  ngAfterViewInit() {
    this.isMobile = this.isMobileLayout();
    window.addEventListener('resize', () => {
      return (this.isMobile = this.isMobileLayout());
    });
  }

  isMobileLayout() {
    return document.body.clientWidth <= MOBILE_LAYOUT_MAX_WIDTH;
  }
}
