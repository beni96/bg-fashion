import { AdminPath, ADMIN_PREFIX } from '../../admin/router/admin.routes.names';
import { BgFashionPath, BG_FASHION_PREFIX } from '../../bg-fashion/router/bg-fashion.routes.names';
import { FooterList } from '../interfaces/footer-list';

const ADMIN_LINK = `${ADMIN_PREFIX}/${AdminPath.Home}`;
const ABOUT_BEN_GOLAN_LINK = 'https://ben-golan-portfolio.firebaseapp.com/';
const CART_LINK = `${BG_FASHION_PREFIX}/${BgFashionPath.Cart}`;
const FAVORITES_LINK = `${BG_FASHION_PREFIX}/${BgFashionPath.Favorites}`;
const LINKEDIN_LINK = 'https://www.linkedin.com/in/ben-golan-24359516b/';
const GITHUB_LINK = 'https://github.com/beni96';

export const GENERAL_LINKS: FooterList[] = [
  { title: 'Admin', linkUrl: ADMIN_LINK },
  { title: 'Cart', linkUrl: CART_LINK },
  { title: 'Favorites', linkUrl: FAVORITES_LINK },
];

export const SOCIAL_LINKS: FooterList[] = [
  { title: 'Linkedin', icon: 'fab fa-linkedin', linkUrl: LINKEDIN_LINK },
  { title: 'Github', icon: 'fab fa-github', linkUrl: GITHUB_LINK },
  { title: 'About Me', icon: 'fas fa-user-circle', linkUrl: ABOUT_BEN_GOLAN_LINK },
];
