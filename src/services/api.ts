import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const baseUrl = 'http://localhost:3333';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTgxYTM1Zi01ODUwLTQxZGItYmM3MC0xYTA0MWFlZTNkOTMiLCJpYXQiOjE2OTk4MzI4ODUsImV4cCI6MTcwMDY5Njg4NX0.Ywl8csZ9dHwQwFCeGy_3YOjW7pU3yg1lGFYBjXhVkXU';

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  headers: {
    'Authorization': `Bearer ${token}`
  },
  validateStatus: status => {
    return status >= 200 && status < 400;
  },
};

export const axiosInstance: AxiosInstance = axios.create(config);

export const setAccessToken = (token: string): void => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
