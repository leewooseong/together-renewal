'use client';

import {useCallback} from 'react';

import {useAtom} from 'jotai';
import {useRouter} from 'next/navigation';

import {deleteCookie} from '../apis/user/userApi';
import {AUTH_TOKEN} from '../constants/auth';
import {tokenWithStorageAtom} from '../store/atoms/userAtoms';

// Todo: 실패 시 에러 핸들링 제대로 적용하기
const useClearAuth = () => {
  const [token, setToken] = useAtom(tokenWithStorageAtom);
  const router = useRouter();

  const clearAuth = useCallback(async () => {
    // 1. Cookie 삭제
    await deleteCookie();

    // 2. Jotai token 초기화
    setToken(null);
    sessionStorage.removeItem(AUTH_TOKEN);

    // 3. 로그인 페이지로 리다이렉트
    router.push('/login');
  }, [router, setToken, token]);

  return {clearAuth};
};

export default useClearAuth;
