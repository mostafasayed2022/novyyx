export interface NavItem {
  title: string;
  titleDe?: string;
  href: string;
  description?: string;
  descriptionDe?: string;
  badge?: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  titleDe?: string;
  items: NavItem[];
}
