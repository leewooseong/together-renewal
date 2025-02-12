import {useQuery} from '@tanstack/react-query';

import {getJoinedGatherings} from '../apis/gatherings/gatheringApi';
import {reviewListQuery} from '../queries/common/queryKeys';
import {useUserQuery} from '../queries/user/useUserQueries';
import {GetMyReviewsProps} from '../types/reviews/reviewsApi.types';
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

  // const {
  //   data: reviewedGatherings,
  //   isLoading: isLoadingReviews,
  //   isError: isErrorReviews,
  // } = useQuery({
  //   queryKey: ['reviewList', userInfo?.id],
  //   queryFn: () => getMyReviews({userId: userInfo!.id, sortOrder: 'desc'}),
  //   enabled: !!userInfo, // userInfo가 있을 때만 실행
  // });
  const userId: number | undefined = userInfo?.id;
  const {
    data: reviewedGatherings,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
  } = useQuery({
    ...reviewListQuery.getMyReviewList({userId, sortOrder: 'desc'} as GetMyReviewsProps),
    enabled: !!userInfo, // userInfo가 있을 때만 실행
  });
  const isLoading = isLoadingGatherings || isLoadingReviews;
  const isError = isErrorGatherings || isErrorReviews;

  return {joinedGatherings, reviewedGatherings, isLoading, isError, userInfo};
}
