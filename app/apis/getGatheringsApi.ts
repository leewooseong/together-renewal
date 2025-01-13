import axios from 'axios';

export default async function getGatheringApi(): Promise<IGetGatherings[]> {
  const resp = await axios(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings`,
  );

  if (!resp) {
    throw new Error('Failed to fetch gatherings');
  }

  return resp.data;
}
