import {useQuery} from '@tanstack/react-query';

import {gatheringsQueryKey, reviewListQuery} from '../queries/common/queryKeys';
import {useUserQuery} from '../queries/user/useUserQueries';

export function useMyGatheringsData() {
  const {getMyInfo} = useUserQuery();
  const {data: userInfoResponse} = getMyInfo();
  const userInfo = userInfoResponse?.data;
  const userId = userInfo?.id ?? 0;

  const {
    data: joinedGatherings,
    isLoading: isLoadingGatherings,
    isError: isErrorGatherings,
  } = useQuery(gatheringsQueryKey.joinedGatherings());

  const {
    data: reviewedGatherings,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
  } = useQuery({
    ...reviewListQuery.getMyReviewList({userId, sortOrder: 'desc'}),
    enabled: !!userInfo || userId === 0,
  });

  const isLoading = isLoadingGatherings || isLoadingReviews;
  const isError = isErrorGatherings || isErrorReviews;

  return {joinedGatherings, reviewedGatherings, isLoading, isError, userInfo};
}
