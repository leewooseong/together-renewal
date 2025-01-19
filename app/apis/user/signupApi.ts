import {AxiosError} from 'axios';

import {clientInstance} from '../client';

export type SignupData = {
  name: string;
  email: string;
  companyName: string;
  password: string;
};

export async function signupUser(data: SignupData): Promise<void> {
  try {
    await clientInstance.post({
      path: '/route/auths/signup',
      body: data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('요청 실패:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || '회원가입 실패');
    }
    console.error('알 수 없는 오류:', error);
    throw new Error('회원가입 중 알 수 없는 오류가 발생했습니다.');
  }
}
