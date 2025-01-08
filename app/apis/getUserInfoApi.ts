import {BASE_API_URL, TEAM_ID} from '../constants/commonConstants';
import {fetchWithToken} from '../utils/fetchWithTokenUtil';

export async function getUserInfoApi(id: number): Promise<IGetUserInfo> {
  const req = `${BASE_API_URL}/${TEAM_ID}/auths/user`;

  return fetchWithToken(req, {method: 'GET'});
}
