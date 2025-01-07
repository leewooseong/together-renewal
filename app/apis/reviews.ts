import {IReviews} from '../types/reviews';

const BASE_URL = 'https://fe-adv-project-together-dallaem.vercel.app/6-6/reviews';
// 마이페이지-나의 리뷰는 userId를 보내야함.
// 모임 상세 페에지는 gatheringId를 보내야함.
export async function getReviews(
  userId?: number,
  gatheringId?: number,
  gatheringType?: string,
): Promise<IReviews> {
  if (userId) {
    const response = await fetch(`${BASE_URL}?userId=${userId}`);
    return response.json();
  } else if (gatheringId) {
    const response = await fetch(`${BASE_URL}?gatheringId=${gatheringId}`);
    return response.json();
  } else if (gatheringType) {
    const response = await fetch(`${BASE_URL}?type=${gatheringType}`);
    return response.json();
  }

  const response = await fetch(BASE_URL);
  return response.json();
}
