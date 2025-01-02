import axios from 'axios';
import {instance} from './axiosInstance';

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
