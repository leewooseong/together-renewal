import axios, {AxiosResponse} from 'axios';

import {User} from '../../store/types/user.types';
import {CodeitError} from '../../types/error.types';
import {clientInstance, serverInstance} from '../client';

export const login = async (email: string, password: string) => {
  try {
    await clientInstance.post({path: '/route/auths/signin', body: {email, password}});
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
  }
};

export const deleteCookie = async (): Promise<AxiosResponse> => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_FRONT_URL}/route/cookie`);
  return res;
};

export const getUserInfo = async (): Promise<User | undefined> => {
  try {
    const userInfoData = await clientInstance.get<User>({
      path: '/route/token/auths/user',
    });
    return userInfoData as User;
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }

    return undefined;
  }
};

export const getUserInfoInServer = async (token?: string): Promise<User | undefined> => {
  try {
    const userInfoData = await serverInstance.get<User>({path: '/auths/user', token});
    return userInfoData;
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
    return undefined;
  }
};
