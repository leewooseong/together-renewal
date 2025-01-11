import {cookies} from 'next/headers';
import {NextResponse, type NextRequest} from 'next/server';

import verifyToken from '@/app/apis/server/tokenApi';
import {AUTH_TOKEN} from '@/app/constants/auth';
import getPageType from '@/app/utils/server';

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_TOKEN);

  // Main logic
  const pageType = getPageType(request.nextUrl.pathname);
  const isValidToken = await verifyToken(token);

  if (isValidToken && pageType === 'guestOnly') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isValidToken && pageType === 'protected') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/join', '/mypage'],
};
