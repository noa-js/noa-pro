import { createRouter, createWebHashHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import { getToken } from '@/utils/token';

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeResolve((to) => {
  const isAuthenticated = getToken();

  if (to.meta.noAuthenticationRequired && isAuthenticated) {
    router.push('/');
    return;
  }

  if (!to.meta.noAuthenticationRequired && !isAuthenticated) {
    router.push('/user/signin');
    return;
  }
});

export default router;
