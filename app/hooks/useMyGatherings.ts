import {useQuery} from '@tanstack/react-query';

import {getJoinedGatherings} from '../apis/gatherings/gatheringApi';
import {getReviews} from '../apis/reviews/reviewsApi';
import {useUserQuery} from '../queries/user/useUserQueries';
import {myGatheringSort} from '../utils/myGatheringSort';

export function useMyGatheringsData() {
  const {getMyInfo} = useUserQuery();
  const {data: userInfoResponse} = getMyInfo();
  const userInfo = userInfoResponse?.data;

  const {
    data: joinedGatherings,
    isLoading: isLoadingGatherings,
    isError: isErrorGatherings,
  } = useQuery({
    queryKey: ['joinedGatherings'],
    queryFn: async () => myGatheringSort(await getJoinedGatherings()),
  });

  const {
    data: reviewedGatherings,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
  } = useQuery({
    queryKey: ['reviewedGatherings', userInfo?.id],
    queryFn: () => getReviews({userId: userInfo?.id}),
    enabled: !!userInfo, // userInfo가 있을 때만 실행
  });

  const isLoading = isLoadingGatherings || isLoadingReviews;
  const isError = isErrorGatherings || isErrorReviews;

  return {joinedGatherings, reviewedGatherings, isLoading, isError, userInfo};
}
