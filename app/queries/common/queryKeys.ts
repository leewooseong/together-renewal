import {
  GetGatheringReviewsProps,
  GetMyReviewsProps,
  GetReviewsProps,
} from '../../types/reviews/reviewsApi.types';

export const getReviewListQueryKey = ({
  gatheringType,
  location,
  date,
  sortBy,
  sortOrder,
}: GetReviewsProps) => ['reviewList', {gatheringType, location, date, sortBy, sortOrder}];

export const getMyReviewListQueryKey = ({userId, sortOrder}: GetMyReviewsProps) => [
  'reviewList',
  {userId, sortOrder},
];

export const getGatheringReviewListQueryKey = ({
  gatheringId,
  sortOrder,
}: GetGatheringReviewsProps) => ['reviewList', {gatheringId, sortOrder}];
