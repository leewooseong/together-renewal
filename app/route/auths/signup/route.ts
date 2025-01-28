import axios from 'axios';
import {NextRequest, NextResponse} from 'next/server';

import {CodeitError} from '../../../types/error.types';

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    if (!body.name || !body.email || !body.companyName || !body.password) {
      return NextResponse.json({message: '필수 데이터가 누락되었습니다.'}, {status: 400});
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/signup`,
      body,
      {
        headers: {'Content-Type': 'application/json'},
      },
    );

    if (response.status === 200) {
      return NextResponse.json({message: '회원가입 성공'}, {status: 200});
    }

    return NextResponse.json(
      {message: '회원가입 실패', error: (response.data as Error).message},
      {status: 400},
    );
  } catch (error: unknown) {
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);
      return NextResponse.json(
        {message: error.message || '회원가입 실패', code: error.code, parameter: error.parameter},
        {status: error.status},
      );
    }
    return NextResponse.json(
      {message: '회원가입 중 알 수 없는 오류가 발생했습니다'},
      {status: 500},
    );
  }
};
