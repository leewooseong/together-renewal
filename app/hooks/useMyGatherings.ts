import {useEffect, useRef} from 'react';

import {useUserInfoQuery} from '../queries/user/useUserQueries';

import {useInfiniteJoinedGatherings} from './useInfiniteGatherings';
import {useInfiniteReviews} from './useInfiniteReviews';

export function useMyGatheringsData() {
  const {userInfo} = useUserInfoQuery();
  const userId = userInfo?.id ?? 0;

  const {
    data: joinedGatherings,
    fetchNextPage: fetchNextJoinedPage,
    hasNextPage: hasNextJoinedPage,
    isFetchingNextPage: isFetchingNextJoinedPage,
    isLoading: isLoadingGatherings,
    isError: isErrorGatherings,
  } = useInfiniteJoinedGatherings(userId);

  const {
    data: reviewedGatherings,
    fetchNextPage: fetchNextReviewPage,
    hasNextPage: hasNextReviewPage,
    isFetchingNextPage: isFetchingNextReviewPage,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
  } = useInfiniteReviews(userId);

  const isLoading = isLoadingGatherings || isLoadingReviews;
  const isError = isErrorGatherings || isErrorReviews;

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextJoinedPage) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextJoinedPage();
        }
      },
      {threshold: 1},
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextJoinedPage, fetchNextJoinedPage]);

  return {
    joinedGatherings: joinedGatherings?.pages?.flat() ?? [],
    fetchNextJoinedPage,
    hasNextJoinedPage,
    isFetchingNextJoinedPage,
    reviewedGatherings: reviewedGatherings?.pages.flat() ?? [],
    fetchNextReviewPage,
    hasNextReviewPage,
    isFetchingNextReviewPage,
    isLoading,
    isError,
    userInfo,
    observerRef,
  };
}
