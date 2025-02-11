import { useInfiniteQuery } from '@tanstack/react-query';
import { getReviews } from '../apis/reviews/reviewsApi';
import type { ReviewListType, ReviewParams } from '../types/common/reviews.types';

export const useInfiniteReviews = (filter: ReviewParams) => {
  return useInfiniteQuery({
    queryKey: ['reviews', filter],
    queryFn: async ({ pageParam = 0 }) => {
      const params: ReviewParams = {
        ...filter,
        limit: 10,
        offset: pageParam * 10,
      };
      return getReviews(params);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.data.length >= (filter.limit || 10)
        ? lastPageParam + 1
        : undefined;
    },
    enabled: !!filter.type, // 필수 필드 유효성 검사
  });
};