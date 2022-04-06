import { HomeFilled, Trophy, ElementPlus } from '@element-plus/icons-vue';

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
    name: 'ElementPlus',
    icon: ElementPlus,
    href: 'https://element-plus.gitee.io/',
  },
];

export default menuConfig;
