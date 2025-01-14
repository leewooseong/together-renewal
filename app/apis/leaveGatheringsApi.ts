import fetchWithToken from '../utils/fetchWithTokenUtil';

/** 모임 참여 취소 */
export default async function leaveGatheringsApi(gatheringId: number): Promise<void> {
  const req = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings/${gatheringId}/leave`;

  fetchWithToken(req, 'DELETE');
}
