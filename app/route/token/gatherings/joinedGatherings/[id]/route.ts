import {NextRequest, NextResponse} from 'next/server';

import {serverInstance} from '../../../../../apis/client';
import {AUTH_TOKEN} from '../../../../../constants/auth';

export type JoinGatheringResponse = {
  code?: string;
  message: string;
};
export const POST = async (request: NextRequest) => {
  const token = request.cookies.get(AUTH_TOKEN)?.value;
  if (!token) {
    return NextResponse.json({message: '인증 토큰이 없습니다.'}, {status: 401});
  }
  const {id} = await request.json();
  const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

  try {
    const codeitResponse = await serverInstance.post<JoinGatheringResponse>({
      path: `${TEAM_ID}/gatherings/${id}/join`,
      body: {
        token,
        teamId: TEAM_ID,
        id,
      },
    });
    return NextResponse.json(codeitResponse, {status: 200});
  } catch (error) {
    console.log('현재 error 객체', error);
    return NextResponse.json(
      {
        message: '모임 참여하기 실패',
      },
      {status: 400},
    );
  }
};
