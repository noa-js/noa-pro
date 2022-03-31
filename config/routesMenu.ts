const menuConfig: Config.RoutesMenu[] = [
  {
    name: 'welcome',
    icon: 'home',
  },
  {
    name: 'admin',
    icon: 'home',
    children: [
      {
        name: 'welcome',
        icon: 'home',
      },
    ],
  },
];

export default menuConfig;
