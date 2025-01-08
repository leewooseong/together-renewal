import {BASE_API_URL, TEAM_ID} from './../constants/commonConstants';
export async function getGatheringApi(): Promise<IGetGatherings[]> {
  const resp = await fetch(`${BASE_API_URL}/${TEAM_ID}gatherings`);

  if (!resp.ok) {
    throw new Error('Failed to fetch gatherings');
  }

  return resp.json();
}
