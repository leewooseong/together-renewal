import {serverInstance} from '../client';

export const verifyToken = async (
  token: {name: string; value: string} | undefined,
): Promise<boolean> => {
  try {
    await serverInstance.get({path: '/auths/user', token: token?.value});
    return true;
  } catch {
    return false;
  }
};
