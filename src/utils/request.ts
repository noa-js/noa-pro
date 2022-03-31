import axios from 'axios';
import { ElNotification } from 'element-plus';
import type { AxiosRequestConfig } from 'axios';
import { getToken } from './token';
import router from '@/router';
import { logout } from './user';

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (req) => {
    const {
      meta: { noAuthenticationRequired },
    } = router.currentRoute.value;

    if (!noAuthenticationRequired) {
      req.headers['X-Authentication'] = getToken();
    }

    return req;
  },
  (err) => Promise.reject(err),
);

axiosInstance.interceptors.response.use(
  (res) => {
    const data: API.Response<any> = res.data;

    if (data.success === false && typeof data.error_message !== 'undefined') {
      ElNotification.error({
        title: `[${data.code}] Response Error`,
        message: data.error_message,
      });

      if (data.code == 401 && getToken()) {
        logout();
      }

      return Promise.reject(data.error_message);
    }

    return data;
  },
  (err) => Promise.reject(err),
);

export default async function request<T>(config: AxiosRequestConfig): Promise<API.Response<T>> {
  return (await axiosInstance.request(config)).data;
}
