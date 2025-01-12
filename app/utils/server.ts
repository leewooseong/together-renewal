import {RequestType} from '../types/server.types';

// Todo: 팀원분들 작성 내용 기반으로 수정하기
const PROTECTED_PATH = ['/mypage'];
const GUEST_ONLY_PATH = ['/login', '/signup'];

const getRequestType = (pathname: string): RequestType => {
  const firstPathName = pathname.split('/').filter(Boolean)[0];
  const secondPathName = pathname.split('/').filter(Boolean)[1];
  const firstPath = `/${firstPathName}`; // 슬래시를 추가하여 배열의 형식과 맞춤
  const secondPath = `/${secondPathName}`;

  if (firstPath === '/route' && secondPath !== '/token') {
    return 'api';
  }

  if (firstPath === '/route' && secondPath === '/token') {
    return 'tokenApi';
  }

  if (PROTECTED_PATH.includes(firstPath)) {
    return 'protected';
  }

  if (GUEST_ONLY_PATH.includes(firstPath)) {
    return 'guestOnly';
  }

  return 'public';
};

export default getRequestType;
