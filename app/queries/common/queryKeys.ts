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
// 'info'와 같이 callback 함수로 작성하면 매개변수를 받아 매개변수에 맞는 queryKey를 생성할 수 있다.
export const userQueryKey = {
  all: ['user'] as const,
  myInfo: () => [...userQueryKey.all, 'info'] as const,
};
