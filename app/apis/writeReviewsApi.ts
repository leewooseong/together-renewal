import {BASE_API_URL, TEAM_ID} from '../constants/commonConstants';
import {fetchWithToken} from '../utils/fetchWithTokenUtil';

/** 리뷰 추가 */
export const writeReviewsApi = async (gatheringId: number, score: number, comment: string) => {
  const req = `${BASE_API_URL}/${TEAM_ID}/reviews?gatheringId=${gatheringId}&score=${score}&comment=${comment}`;

  return fetchWithToken(req, {method: 'POST'});
};
