import {
  GetGatheringReviewsProps,
  GetMyReviewsProps,
  GetReviewsProps,
} from '../../types/reviews/reviewsApi.types';

export const getReviewListQueryKey = ({
  type,
  location,
  date,
  sortBy,
  sortOrder,
}: GetReviewsProps) => ['reviewList', {type, location, date, sortBy, sortOrder}];

export const getMyReviewListQueryKey = ({userId, sortOrder}: GetMyReviewsProps) => [
  'reviewList',
  {userId, sortOrder},
];

export const getGatheringReviewListQueryKey = ({
  gatheringId,
  sortOrder,
}: GetGatheringReviewsProps) => ['reviewList', {gatheringId, sortOrder}];
