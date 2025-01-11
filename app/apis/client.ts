'use client';

import axios, {AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

// :: create Instance
const baseConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
  timeout: 10 * 1000,
  withCredentials: true,
};

const instance = axios.create(baseConfig);
const multipartInstance = axios.create(baseConfig);

// :: interceptor setting
// 1. request
// - 요청이 전달되기 전에 작업 수행
const reqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const headers = new AxiosHeaders(config.headers);
  headers.set('Content-Type', 'application/json');

  return {
    ...config,
    headers,
  };
};
const multipartReqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const headers = new AxiosHeaders(config.headers);
  headers.set('Content-Type', 'multipart/form-data');

  return {
    ...config,
    headers,
  };
};

// 요청 오류가 있는 작업 수행
const requestError = (error: unknown): Promise<never> => {
  return Promise.reject(error);
};

// 2. response
// 2.1. response success
// - 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
// - 응답 데이터가 있는 작업 수행
const resolveResponse = (response: AxiosResponse): AxiosResponse => response;
// 2.2. response error
// - 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
// - 401 권한 에러일 경우, auth 관련 부분 모두 제거

const responseError = async (error: AxiosError): Promise<never> => {
  return Promise.reject(error);
};

instance.interceptors.request.use(reqPrev, requestError);
instance.interceptors.response.use(resolveResponse, responseError);

multipartInstance.interceptors.request.use(multipartReqPrev, requestError);
multipartInstance.interceptors.response.use(resolveResponse, responseError);

export {instance, multipartInstance};
