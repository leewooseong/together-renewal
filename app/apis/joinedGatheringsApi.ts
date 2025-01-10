import {SORT_BY} from '../constants/commonConstants';
import fetchWithToken from '../utils/fetchWithTokenUtil';
import validationUtil from '../utils/validationUtil';

/** 로그인된 사용자가 참석한 모임 목록 조회 */
export default async function joinedGatheringsApi(filters: {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: (typeof SORT_BY)[number];
  sortOrder?: 'asc' | 'desc';
}): Promise<IGetJoinedGatherings[]> {
  const queryParams = new URLSearchParams();

  if (filters.sortBy) {
    validationUtil(filters.sortBy, SORT_BY, 'sortBy');
  }
  if (filters.sortOrder) {
    validationUtil(filters.sortOrder, ['asc', 'desc'], 'sortOrder');
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const req = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gathering/joined${
    queryParams ? `?${queryParams.toString()}` : ''
  }`;

  return fetchWithToken(req, {method: 'GET'});
}
