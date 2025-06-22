import {useLayoutEffect, useState} from 'react';

import {PROFILE_INFO} from '../constants/service';
import {useUserInfoQuery} from '../queries/user/useUserQueries';
import {User} from '../types/users/user.types';

export const useUserInfoWithStorage = () => {
  const getStorageUserInfo = () => {
    if (typeof window !== 'undefined') {
      const storageUserInfoString = sessionStorage.getItem(PROFILE_INFO) || '';
      const storageUserInfo = storageUserInfoString ? JSON.parse(storageUserInfoString) : null;

      return storageUserInfo;
    }

    return null;
  };

  const {userInfo: fetchedUserInfo, isFetching} = useUserInfoQuery();
  const [userInfo, setUserInfo] = useState<undefined | User | null>(undefined);

  useLayoutEffect(() => {
    if (isFetching) {
      setUserInfo(getStorageUserInfo());
    } else if (fetchedUserInfo) {
      sessionStorage.setItem(PROFILE_INFO, JSON.stringify(fetchedUserInfo) || '');
      setUserInfo(fetchedUserInfo);
    } else {
      sessionStorage.removeItem(PROFILE_INFO);
      setUserInfo(null);
    }
  }, [fetchedUserInfo, isFetching]);

  return {userInfo};
};
