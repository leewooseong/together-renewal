'use client';

import {useCallback} from 'react';

import {useRouter} from 'next/navigation';

import {deleteCookie} from '../apis/user/userApi';

// Todo: 실패 시 에러 핸들링 제대로 적용하기
const useClearAuth = () => {
  const router = useRouter();

  const clearAuth = useCallback(async () => {
    // 1. Cookie 삭제
    await deleteCookie();

    // 2. 로그인 페이지로 리다이렉트
    router.push('/login');
  }, [router]);

  return {clearAuth};
};

export default useClearAuth;
