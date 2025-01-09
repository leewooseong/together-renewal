import {BASE_API_URL, TEAM_ID} from '../constants/commonConstants';
import fetchWithToken from '../utils/fetchWithTokenUtil';

export default async function createGatheringApi(props: ICreateGathering): Promise<void> {
  const queryParams = new URLSearchParams();
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });
  const req = `${BASE_API_URL}/${TEAM_ID}/gathering?${queryParams.toString()}`;

  fetchWithToken(req, {method: 'POST'});
}
