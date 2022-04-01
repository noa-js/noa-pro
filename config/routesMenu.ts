import { HomeFilled, Trophy, Eleme } from '@element-plus/icons-vue';

const menuConfig: Config.RouterMenu[] = [
  {
    name: 'welcome',
    icon: HomeFilled,
  },
  {
    name: 'admin',
    icon: Trophy,
    children: [
      {
        name: 'welcome',
      },
    ],
  },
  {
    name: 'goToEleme',
    icon: Eleme,
    href: 'https://www.ele.me/',
  },
];

export default menuConfig;
