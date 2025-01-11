import {NextResponse} from 'next/server';

import {AUTH_TOKEN, TOKEN_EXPIRE_TIME} from '@/app/constants/auth';
import {AuthError} from '@/app/types/error.types';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const codeitLoginResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    // API Server에서 에러 코드 응답을 받아도 에러가 throw 안되서 switch로 에러 throw
    const codeitLoginResponseData = await codeitLoginResponse.json();

    switch (codeitLoginResponse.status) {
      case 200:
        return Response.json(
          {message: '로그인 성공'},
          {
            status: 200,
            headers: {
              'Set-Cookie': `${AUTH_TOKEN}=${codeitLoginResponseData.token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${TOKEN_EXPIRE_TIME}`,
              // 배포 후 https 환경에서 사용하도록
              // 'Set-Cookie': `auth-token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
            },
          },
        );
      case 401:
        throw new AuthError('비밀번호가 아이디와 일치하지 않습니다.', 'INVALID_CREDENTIALS', 401);
      case 404:
        throw new AuthError('존재하지 않는 아이디입니다.', 'USER_NOT_FOUND', 404);
      default:
        throw new AuthError('서버 오류가 발생했습니다.', 'SERVER_ERROR', 500);
    }
  } catch (error) {
    // fetch 에러인 경우
    if (error instanceof Response) {
      const errorData = await error.json();
      return NextResponse.json(
        {message: errorData.message || '로그인 실패'},
        {status: error.status},
      );
    }

    // 일반적인 에러인 경우
    if (error instanceof AuthError) {
      return NextResponse.json(
        {message: error.message || '로그인 실패', code: error.code},
        {status: error.status},
      );
    }

    // 예상치 못한 에러인 경우

    return NextResponse.json({message: '알 수 없는 오류가 발생했습니다'}, {status: 500});
  }
}
