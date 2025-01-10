export default async function getGatheringApi(): Promise<IGetGatherings[]> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings`,
  );

  if (!resp.ok) {
    throw new Error('Failed to fetch gatherings');
  }

  return resp.json();
}
