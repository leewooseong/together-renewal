'use client';

// :: Production Axios Instance
import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

// :: create Instance
const baseConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}`,
  timeout: 10 * 1000,
  headers: {'Content-Type': 'application/json'},
};

const multipartConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}`,
  timeout: 10 * 1000,
  headers: {'Content-Type': 'multipart/form-data'},
};

const instance = axios.create(baseConfig);
const multipartInstance = axios.create(multipartConfig);

// :: interceptor setting
// 1. request
// - 요청이 전달되기 전에 작업 수행
const requestPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
};

const multipartReqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
};

// 요청 오류가 있는 작업 수행
const requestError = (error: unknown): Promise<never> => {
  return Promise.reject(error);
};

// 2. response
// - 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
// - 응답 데이터가 있는 작업 수행
const resolveResponse = (response: AxiosResponse): AxiosResponse => response;
// - 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
// - 응답 오류가 있는 작업 수행
const responseError = (error: AxiosError): Promise<never> => {
  console.log(error);
  return Promise.reject(error);
};

instance.interceptors.request.use(requestPrev, requestError);
instance.interceptors.response.use(resolveResponse, responseError);

multipartInstance.interceptors.request.use(multipartReqPrev, requestError);
multipartInstance.interceptors.response.use(resolveResponse, responseError);

export {instance, multipartInstance};
