'use client';
// :: Production Axios Instance
import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

// :: create Instance
const baseConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}`,
  timeout: 10 * 1000,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
};
const multipartConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}`,
  timeout: 10 * 1000,
  headers: {'Content-Type': 'multipart/form-data'},
  withCredentials: true,
};

const tokenInstance = axios.create(baseConfig);
const tokenMultipartInstance = axios.create(multipartConfig);

// :: interceptor setting
// 1. request
// - 요청이 전달되기 전에 작업 수행
const tokenReqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
};
const tokenMultipartReqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
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

tokenInstance.interceptors.request.use(tokenReqPrev, requestError);
tokenInstance.interceptors.response.use(resolveResponse, responseError);

tokenMultipartInstance.interceptors.request.use(tokenMultipartReqPrev, requestError);
tokenMultipartInstance.interceptors.response.use(resolveResponse, responseError);

// :: axios Error 여부 판단
const isAxiosError = <E,>(err: unknown | AxiosError<E>): err is AxiosError => {
  return axios.isAxiosError(err);
};

export {isAxiosError, tokenInstance, tokenMultipartInstance};
