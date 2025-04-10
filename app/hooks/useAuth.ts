'use client';

import {useCallback, useLayoutEffect} from 'react';

import {useQueryClient} from '@tanstack/react-query';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

import {deleteCookie} from '../apis/userApi';
import {PROFILE_INFO} from '../constants/service';
import {userQueryKey} from '../queries/common/queryKeys';
import {getPageType} from '../utils/server';

// Todo: 실패 시 에러 핸들링 제대로 적용하기
export const useClearAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const clearAuthData = async () => {
    await deleteCookie();
    queryClient.setQueryData(userQueryKey.myInfo(), null);
    sessionStorage.removeItem(PROFILE_INFO);
  };

  // 인증 정보 처리
  const clearAuth = useCallback(async () => {
    await clearAuthData();
    router.push('/login');
  }, [router]);

  return {clearAuth, clearAuthData};
};

export const useClearAuthByPageType = () => {
  const path = usePathname();
  const params = useSearchParams();
  const {clearAuthData} = useClearAuth();

  // 페이지에 따라 인증 정보 처리
  useLayoutEffect(() => {
    const currentPageType = getPageType(path);
    if (currentPageType === 'guestOnly') {
      clearAuthData();
    }
  }, [path, params]);
};
