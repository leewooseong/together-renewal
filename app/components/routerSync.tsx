'use client';

import {getDefaultStore} from 'jotai';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {AUTH_ERROR_EVENT} from '../constants/event';
import {tokenWithStorageAtom} from '../store/atoms/userAtoms';

function RouterSync() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthError = () => {
      const tokenStore = getDefaultStore();
      // Todo: 1. Cookie 삭제

      // 2. Jotai token 초기화
      tokenStore.set(tokenWithStorageAtom, null);

      // 3. 로그인 페이지로 리다이렉트
      router.push('/login');
    };

    window.addEventListener(AUTH_ERROR_EVENT, handleAuthError);

    return () => {
      window.removeEventListener(AUTH_ERROR_EVENT, handleAuthError);
    };
  }, [router]);

  return <></>;
}

export default RouterSync;
