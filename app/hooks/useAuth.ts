'use client';

import {useLayoutEffect} from 'react';

import {usePathname, useSearchParams} from 'next/navigation';

import {useAuthMutation} from '../queries/user/useUserMutations';
import {getPageType} from '../utils/server';

export const useClearAuthByPageType = () => {
  const path = usePathname();
  const params = useSearchParams();
  const {clearAuthData} = useAuthMutation();

  // 페이지에 따라 인증 정보 처리
  useLayoutEffect(() => {
    const currentPageType = getPageType(path);
    if (currentPageType === 'guestOnly') {
      clearAuthData();
    }
  }, [path, params]);
};
