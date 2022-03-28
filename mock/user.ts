import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/v1/signin/',
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
      if (body.username === 'admin' && body.password === 'admin') {
        return { success: true, data: { token: 'FAKE TOKEN' } };
      } else {
        return { code: 401, success: false, error_message: 'Authentication failed' };
      }
    },
  },
] as MockMethod[];
