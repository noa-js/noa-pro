import request from '@/utils/request';

export async function signin(data: API.SigninData) {
  return request<API.SigninResponse>({ url: '/api/v1/signin/', method: 'POST', data });
}
