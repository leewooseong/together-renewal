import {useAtom} from 'jotai';
import {useRouter} from 'next/navigation';
import {useCallback} from 'react';
import {deleteCookie} from '../apis/user/userApi';
import {tokenWithStorageAtom} from '../store/atoms/userAtoms';

// Todo: 실패 시 에러 핸들링 제대로 적용하기
export const useLogout = () => {
  const [token, setToken] = useAtom(tokenWithStorageAtom);
  const router = useRouter();

  const logout = useCallback(async () => {
    // 1. Cookie 삭제
    await deleteCookie();

    // 2. Jotai token 초기화
    setToken(null);

    // 3. 로그인 페이지로 리다이렉트
    router.push('/login');
  }, [router, setToken, token]);

  return {logout};
};
