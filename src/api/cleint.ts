import axios, { AxiosRequestConfig } from 'axios';

import { BASE_URL } from 'constants/urls';

declare module 'axios' {
  export interface AxiosInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

export type Config = Pick<AxiosRequestConfig, 'baseURL' | 'cancelToken' | 'headers'>;

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
});

client.interceptors.response.use((response) => response.data);
