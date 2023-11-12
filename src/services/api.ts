import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const baseUrl = 'http://localhost:3333';

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  validateStatus: status => {
    return status >= 200 && status < 400;
  },
};

export const axiosInstance: AxiosInstance = axios.create(config);

export const setAccessToken = (token: string): void => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
