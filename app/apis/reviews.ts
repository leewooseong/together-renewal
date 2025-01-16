import {ReviewListType} from '../types/common/reviews.types';

const BASE_URL = 'https://fe-adv-project-together-dallaem.vercel.app/6-6/reviews';

export type GetReviewsProps = {
  userId?: number;
  gatheringId?: number;
  gatheringType?: string;
  location?: string;
  date?: string;
  sortBy?: string;
  sortOrder?: string;
};

// 마이페이지-나의 리뷰는 userId를 보내야함.
// 모임 상세 페에지는 gatheringId를 보내야함.
export async function getReviews({
  userId,
  gatheringId,
  gatheringType,
  location,
  date,
  sortBy,
  sortOrder,
}: GetReviewsProps): Promise<ReviewListType> {
  const queryParams = new URLSearchParams();

  // 기본값
  // queryParams.append('sortOrder', 'desc');

  // 선택적 매개변수
  if (userId) queryParams.append('userId', userId.toString());
  if (gatheringId) queryParams.append('gatheringId', gatheringId.toString());
  if (gatheringType) queryParams.append('type', gatheringType);
  if (location) queryParams.append('location', location);
  if (date) queryParams.append('date', date);
  if (sortBy) queryParams.append('sortBy', sortBy);
  if (sortOrder) queryParams.append('sortOrder', sortOrder);

  const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Fail');
  }
  return response.json();
  // if (userId) {
  //   const response = await fetch(`${BASE_URL}?userId=${userId}`);
  //   return response.json();
  // }
  // if (gatheringId) {
  //   const response = await fetch(`${BASE_URL}?gatheringId=${gatheringId}`);
  //   return response.json();
  // }
  // if (gatheringType) {
  //   const response = await fetch(`${BASE_URL}?type=${gatheringType}`);
  //   return response.json();
  // }

  // const response = await fetch(BASE_URL);
  // return response.json();
}
