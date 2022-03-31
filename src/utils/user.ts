import router from '@/router';
import { clearToken } from './token';

export function logout() {
  clearToken();
  router.push({ name: 'user-signin' });
}
