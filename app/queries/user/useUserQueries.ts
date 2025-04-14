import {useQuery} from '@tanstack/react-query';

import {getUserInfo} from '../../apis/userApi';
import {userQueryKey} from '../common/queryKeys';

// userInfo Query
// - 서버에서는 단순히 데이터 응답을 받아야하고
// - 클라이언트에서는 storage 정보와 함께 이용해야한다.
export const useUserInfoQuery = () => {
  const {
    data: userInfoRes,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: userQueryKey.myInfo(),
    queryFn: getUserInfo,
  });

  return {userInfo: userInfoRes?.data, isFetching, refetch, isError, isLoading};
};
