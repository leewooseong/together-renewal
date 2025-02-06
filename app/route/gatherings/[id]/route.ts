import {NextRequest, NextResponse} from 'next/server';

import {serverInstance} from '../../../apis/client';
import {CodeitError} from '../../../types/error.types';

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.pathname.split('/').pop(); // URL 경로에서 마지막 값(id) 가져오기
  if (!id || Number.isNaN(Number(id)) || Number(id) <= 0) {
    return NextResponse.json({message: 'Invalid gathering ID'}, {status: 400});
  }

  try {
    const response = await serverInstance.get({
      path: `/gatherings/${id}`,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);

      // ✅ 서버에서 404 응답이 온 경우
      if (error.status === 404) {
        return NextResponse.json({message: `${id}번 모임을 찾을 수 없습니다.`}, {status: 404});
      }
      return NextResponse.json(
        {
          message: error.message || '모임 상세 정보 가져오기 실패',
          code: error.code,
          parameter: error.parameter,
        },
        {status: error.status},
      );
    }
  }
  return NextResponse.json(
    {message: '모임 상세 정보를 가져오는 중 알 수 없는 오류가 발생했습니다'},
    {status: 500},
  );
};
