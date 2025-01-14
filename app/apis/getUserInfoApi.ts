import fetchWithToken from '../utils/fetchWithTokenUtil';

export default async function getUserInfoApi(): Promise<GetUserInfo> {
  const req = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/user`;

  return fetchWithToken(req, 'GET');
}
