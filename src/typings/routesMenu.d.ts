declare namespace Config {
  type RouterMenu = {
    name: string;
    href?: string;
    icon?: routerMenuConfig;
    path?: string;
    meta?: Record<string, any>;
    children?: RouterMenu[];
  };
}
