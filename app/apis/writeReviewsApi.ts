import {BASE_API_URL, TEAM_ID} from '../constants/commonConstants';
import fetchWithToken from '../utils/fetchWithTokenUtil';

/** 리뷰 추가 */
export default function writeReviewsApi(gatheringId: number, score: number, comment: string) {
  const req = `${BASE_API_URL}/${TEAM_ID}/reviews?gatheringId=${gatheringId}&score=${score}&comment=${comment}`;

  fetchWithToken(req, {method: 'POST'});
}
