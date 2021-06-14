import { Component } from '@angular/core';
import { GENERAL_LINKS, SOCIAL_LINKS } from '../../common/footer-links';
import { FooterList } from '../../interfaces/footer-list';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  generalLinks: FooterList[] = GENERAL_LINKS;
  socialLinks: FooterList[] = SOCIAL_LINKS;
}
