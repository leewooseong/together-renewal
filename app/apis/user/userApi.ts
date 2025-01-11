import axios, {AxiosResponse} from 'axios';

import {User} from '@/app/store/types/user.types';

import {instance} from '../client';

interface ILoginResponse {
  token: string;
}

interface IErrorResponse {
  code: string;
  message: string;
}

export const login = async (
  email: string,
  password: string,
): Promise<ILoginResponse | IErrorResponse | undefined> => {
  try {
    const res = await instance.post('/auths/signin', {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return undefined; // 명시적 반환 추가
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
