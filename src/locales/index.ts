import { createI18n } from 'vue-i18n';
import localeConfig from '~/config/locale';

import pageEnUS from './page/en_US.yaml';
import pageZhCN from './page/zh_CN.yaml';

const i18n = createI18n({
  legacy: false,
  locale: localeConfig.default,
  globalInjection: true,
  messages: {
    en_US: {
      ...pageEnUS,
    },
    zh_CN: {
      ...pageZhCN,
    },
  },
});

export default i18n;
