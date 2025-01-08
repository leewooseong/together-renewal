import { BASE_API_URL, TEAM_ID } from '../constants/commonConstants';
import { fetchWithToken } from '../utils/fetchWithTokenUtil';

/** 모임 참여 취소 */
export async function leaveGatheringsApi (gatheringId: number): Promise<void>{
  const req = `${BASE_API_URL}/${TEAM_ID}/gathering/${gatheringId}/leave`;

  fetchWithToken(req, {method: 'DELETE'});
};
