/* eslint-disable prettier/prettier */
import {getGatheringReviews, getMyReviews, getReviews} from '../../apis/reviews/reviewsApi';
import {
  GetGatheringReviewsProps,
  GetMyReviewsProps,
  GetReviewsProps,
} from '../../types/reviews/reviewsApi.types';

export const reviewListQuery = {
  all: ['reviewList'] as const,
  getQueryKey: <T,>(params: T) => [...reviewListQuery.all, params] as const,

  getReviewList: (params: GetReviewsProps) => ({
    queryKey: reviewListQuery.getQueryKey(params),
    queryFn: () => getReviews(params),
  }),

  getMyReviewList: (params: GetMyReviewsProps) => ({
    queryKey: reviewListQuery.getQueryKey(params),
    queryFn: () => getMyReviews(params),
  }),
  getGatheringReviewList: (params: GetGatheringReviewsProps) => ({
    queryKey: reviewListQuery.getQueryKey(params),
    queryFn: () => getGatheringReviews(params),
  }),
};
