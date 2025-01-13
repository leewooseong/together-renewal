import fetchWithToken from '../utils/fetchWithTokenUtil';

/** 로그인된 사용자가 참석한 모임 목록 조회 */
export default async function joinedGatheringsApi(filters: {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'participantCount';
  sortOrder?: 'asc' | 'desc';
}): Promise<IGetJoinedGatherings[]> {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const req = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings/joined?${
    queryParams ? `${queryParams.toString()}` : 'sortBy=dateTime&sortOrder=asc'
  }`;

  return fetchWithToken(req, 'GET');
}
