'use client';

import {useCallback} from 'react';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';

import {deleteCookie} from '../../apis/userApi';
import {PROFILE_INFO} from '../../constants/service';
import {userQueryKey} from '../common/queryKeys';

export const useAuthMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteAuthData = useCallback(async () => {
    await deleteCookie();
    queryClient.setQueryData(userQueryKey.myInfo(), null);
    sessionStorage.removeItem(PROFILE_INFO);
  }, [queryClient]);

  const deleteAuth = useCallback(async () => {
    await deleteAuthData();
    router.push('/login');
  }, [router]);

  const {mutate: logout, mutateAsync: clearAuth} = useMutation({
    mutationFn: deleteAuth,
    onError: error => {
      console.error('로그아웃 오류:', error);
    },
  });

  const {mutateAsync: clearAuthData} = useMutation({
    mutationFn: deleteAuthData,
  });

  return {logout, clearAuth, clearAuthData};
};
