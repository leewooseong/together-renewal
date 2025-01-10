import fetchWithToken from '../utils/fetchWithTokenUtil';

/** 리뷰 추가 */
export default function writeReviewsApi(gatheringId: number, score: number, comment: string) {
  const req = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/reviews?gatheringId=${gatheringId}&score=${score}&comment=${comment}`;

  fetchWithToken(req, {method: 'POST'});
}
