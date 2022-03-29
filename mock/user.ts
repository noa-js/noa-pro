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
  {
    url: '/api/v1/me/',
    method: 'get',
    timeout: 500,
    data: {
      code: 401,
      success: true,
      username: 'admin',
      email: 'admin@noa.com',
    },
  },
] as MockMethod[];
