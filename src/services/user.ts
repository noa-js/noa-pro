import request from '@/utils/request';

export async function signin(data: API.SigninData) {
  return request<API.SigninResponse>({ url: '/api/v1/signin/', method: 'POST', data });
}

export async function getCurrentUser() {
  return request<API.CurrentUser>({ url: '/api/v1/me/', method: 'GET' });
}
