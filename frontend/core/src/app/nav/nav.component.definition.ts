export type Application = {
  header: string;
  links: NavLink[];
};

export type NavLink = {
  displayName: string;
  routerLink: string;
};
