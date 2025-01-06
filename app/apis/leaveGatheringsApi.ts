import {BASE_API_URL, TEAM_ID} from '../constants/commonConstants';
import {fetchWithToken} from '../utils/fetchWithTokenUtil';

/** 모임 참여 취소 */
export const leaveGatheringsApi = async (gatheringId: number) => {
  const req = `${BASE_API_URL}/${TEAM_ID}/gathering/${gatheringId}/leave`;

  return fetchWithToken(req, {method: 'DELETE'});
};
