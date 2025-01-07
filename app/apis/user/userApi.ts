import {tokenWithStorageAtom} from '@/app/store/atoms/userAtoms';
import axios, {AxiosResponse} from 'axios';
import {getDefaultStore} from 'jotai';
import {instance} from '../client/clientInstance';

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
  }
};

// baseURL이 tokenInstance와 달라서 개별적으로 처리
export const setCookie = async (): Promise<AxiosResponse> => {
  const token = getDefaultStore().get(tokenWithStorageAtom);

  const res = await axios.get(`${process.env.NEXT_PUBLIC_FRONT_URL}/cookie`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const deleteCookie = async (): Promise<AxiosResponse> => {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_FRONT_URL}/cookie`);
  return res;
};
