declare namespace Config {
  type RoutesMenu = {
    name: string;
    icon?: string;
    children?: RoutesMenu[];
  };

  type FullRoutesMenu = {
    name: string;
    icon?: string;
    path: string;
    meta: Record<string, any>;
    children?: FullRoutesMenu[];
  };
}
