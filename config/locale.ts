type LocalConfig = {
  default: LocalConfig['locales'][number]['label'];
  locales: { label: string; value: string }[];
};

const localConfig: LocalConfig = {
  default: 'en_US',
  locales: [
    {
      label: 'English',
      value: 'en_US',
    },
    {
      label: '简体中文',
      value: 'zh_CN',
    },
  ],
};

export default localConfig;
