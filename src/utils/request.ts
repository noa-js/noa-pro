import axios from 'axios';
import { ElNotification } from 'element-plus';
import type { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (req) => req,
  (err) => err,
);

axiosInstance.interceptors.response.use(
  (res) => {
    const data: API.Response<any> = res.data;

    if (data.success === false && typeof data.error_message !== 'undefined') {
      ElNotification.error({
        title: `[${data.code}] Request Error`,
        message: data.error_message,
      });
      return Promise.reject(data.error_message);
    }

    return data;
  },
  (err) => err,
);

export default async function request<T>(config: AxiosRequestConfig): Promise<API.Response<T>> {
  return (await axiosInstance.request(config)).data;
}
