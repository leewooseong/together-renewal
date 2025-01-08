import {TPageType} from '../types/server.types';

// Todo: 팀원분들 작성 내용 기반으로 수정하기
const PROTECTED_PATH = ['/mypage'];
const GUEST_ONLY_PATH = ['/login', '/join'];

export const getPageType = (pathname: string): TPageType => {
  const firstPathName = pathname.split('/').filter(Boolean)[0];
  const firstPath = '/' + firstPathName; // 슬래시를 추가하여 배열의 형식과 맞춤

  if (PROTECTED_PATH.includes(firstPath)) {
    return 'protected';
  }

  if (GUEST_ONLY_PATH.includes(firstPath)) {
    return 'guestOnly';
  }

  return 'public';
};
