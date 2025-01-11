import axios, {AxiosResponse} from 'axios';

import {User} from '@/app/store/types/user.types';
import {AuthError} from '@/app/types/error.types';

import {instance} from '../client';

export const login = async (email: string, password: string) => {
  try {
    await instance.post('/route/login', {
      email,
      password,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      // 서버에서 보낸 에러 정보 유지
      throw new AuthError(
        error.response.data.message,
        error.response.data.code,
        error.response.data.status,
      );
    }
  }
};

export const deleteCookie = async (): Promise<AxiosResponse> => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_FRONT_URL}/cookie`);
  return res;
};

export const getUserInfo = async (): Promise<User> => {
  const res = await instance.get('/auths/user');

  return res.data;
};
