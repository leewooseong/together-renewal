import {useQuery} from '@tanstack/react-query';

import {getUserInfo} from '../../apis/userApi';
import {PROFILE_INFO} from '../../constants/service';
import {userQueryKey} from '../common/queryKeys';

// userInfo Query
// Todo: createGathering 참고해서 코드 개선하기
export const useUserQuery = () => {
  const getMyInfo = () => {
    return useQuery({
      queryKey: userQueryKey.myInfo(),
      queryFn: getUserInfo,
    });
  };

  return {getMyInfo};
};

export const useUserInfoQuery = () => {
  const {
    data: userInfoRes,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: userQueryKey.myInfo(),
    queryFn: getUserInfo,
  });

  if (isFetched) {
    if (userInfoRes?.data) {
      sessionStorage.setItem(PROFILE_INFO, JSON.stringify(userInfoRes?.data) || '');
    } else {
      sessionStorage.removeItem(PROFILE_INFO);
    }
  }

  return {userInfo: userInfoRes?.data, isLoading, isFetched};
};
