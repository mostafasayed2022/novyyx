export interface NavItem {
  title: string;
  titleDe?: string;
  titleFr?: string;
  href: string;
  description?: string;
  descriptionDe?: string;
  descriptionFr?: string;
  badge?: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  titleDe?: string;
  titleFr?: string;
  items: NavItem[];
}
