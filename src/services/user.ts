import request from '@/utils/request';

export async function login(data: API.LoginData) {
  return request<API.LoginResponse>({ url: '/api/v1/login/', method: 'POST', data });
}
