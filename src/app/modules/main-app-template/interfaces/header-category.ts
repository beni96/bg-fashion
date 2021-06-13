export interface HeaderCategory {
  title: string;
  menuImageUrl?: string;
  linkUrl: string;
  menuCategories?: HeaderMenuCategories[];
}

export interface HeaderMenuCategories {
  title: string;
  linkUrl: string;
}
