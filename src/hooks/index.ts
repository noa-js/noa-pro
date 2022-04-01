import { inject } from 'vue';

export const useRouterMenuCollapse = () => {
  const state: Machine.State = inject('routerMenuCollapseState');
  const send: Machine.Send = inject('routerMenuCollapseSend');

  return { state, send };
};
