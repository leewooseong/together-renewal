'use client';

import axios, {AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {getDefaultStore} from 'jotai';

import {AUTH_ERROR_EVENT} from '@/app/constants/event';
import {tokenWithStorageAtom} from '@/app/store/atoms/userAtoms';

// :: create Instance
const baseConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}`,
  timeout: 10 * 1000,
  // withCredentials: true,
};

const tokenInstance = axios.create(baseConfig);
const tokenMultipartInstance = axios.create(baseConfig);

// :: interceptor setting
// 1. request
// - 요청이 전달되기 전에 작업 수행
const tokenReqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const tokenStore = getDefaultStore();
  const token = tokenStore.get(tokenWithStorageAtom);

  const headers = new AxiosHeaders(config.headers);
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  return {
    ...config,
    headers,
  };
};
const tokenMultipartReqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const tokenStore = getDefaultStore();
  const token = tokenStore.get(tokenWithStorageAtom);
  const headers = new AxiosHeaders(config.headers);
  headers.set('Authorization', `Bearer ${token}`);
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
  // 토큰 발급이 실패했을 때 Route Sync에서 로그인 실패를 처리할 수 있도록 custom event 발생
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    window.dispatchEvent(new CustomEvent(AUTH_ERROR_EVENT));
  }
  return Promise.reject(error);
};

tokenInstance.interceptors.request.use(tokenReqPrev, requestError);
tokenInstance.interceptors.response.use(resolveResponse, responseError);

tokenMultipartInstance.interceptors.request.use(tokenMultipartReqPrev, requestError);
tokenMultipartInstance.interceptors.response.use(resolveResponse, responseError);

export {tokenInstance, tokenMultipartInstance};
