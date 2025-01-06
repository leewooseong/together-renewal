// :: Production Axios Instance
import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {redirect} from 'next/navigation';

// :: create Instance
const baseConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}`,
  timeout: 10 * 1000,
  // withCredentials: true,
};

const serverTokenInstance = axios.create(baseConfig);

// :: interceptor setting
// 1. request
// - 요청이 전달되기 전에 작업 수행
const tokenReqPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // Todo: cookie에서 값을 추출해서 Authorization header에 넣어주도록 개발
  config.headers['Content-Type'] = 'application/json';

  return config;
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
const clearAuth = async () => {
  // Todo: 1. Cookie 삭제

  // 2. 로그인 페이지로 리다이렉트
  redirect('/login');
};

const responseError = async (error: AxiosError): Promise<never> => {
  // 토큰 발급이 실패했을 때
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    await clearAuth();
  }
  return Promise.reject(error);
};

serverTokenInstance.interceptors.request.use(tokenReqPrev, requestError);
serverTokenInstance.interceptors.response.use(resolveResponse, responseError);

export {serverTokenInstance};
