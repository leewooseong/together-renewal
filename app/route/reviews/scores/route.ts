import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;
  const {searchParams} = new URL(request.url);

  // const userId = searchParams.get('userId');
  // const gatheringId = searchParams.get('gatheringId');
  // const sortOrder = searchParams.get('sortOrder');
  // const gatheringType = searchParams.get('type');
  // console.log('Request URL:', request.url);
  // console.log('Search Params:', searchParams.toString());
  // console.log(gatheringType);
  const response = await fetch(`${BASE_URL}/${TEAM_ID}/reviews/scores?${searchParams}`);
  const data = await response.json();
  // console.log('Response Data:', data); // data 확인
  return NextResponse.json(data);
}
