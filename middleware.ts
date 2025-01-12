import {cookies} from 'next/headers';
import {NextResponse, type NextRequest} from 'next/server';

import {AUTH_TOKEN} from '@/app/constants/auth';
import getRequestType from '@/app/utils/server';

import {isPageType} from './app/utils/type';
import {protectRoute} from './middlewares/routeProtection';

export default async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_TOKEN);

  const requestType = getRequestType(request.nextUrl.pathname);
  if (isPageType(requestType)) {
    return protectRoute(token, requestType, request.url);
  }

  // 추가적인 middleware 선언은 아래서 처리
  // ...

  return NextResponse.next();
}

// 변수로 선언하면 반영이 되지 않으니 주의!
export const config = {
  matcher: ['/login', '/signup', '/mypage'],
};
