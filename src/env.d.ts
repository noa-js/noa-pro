/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.yaml' {}

declare module '*.scss' {
  const css: any;
  export default css;
}

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
}
