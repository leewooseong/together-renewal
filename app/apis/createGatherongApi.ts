import fetchWithToken from '../utils/fetchWithTokenUtil';

export default async function createGatheringApi(props: ICreateGathering): Promise<void> {
  const queryParams = new URLSearchParams();
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });
  const req = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gathering?${queryParams.toString()}`;

  fetchWithToken(req, 'POST');
}
