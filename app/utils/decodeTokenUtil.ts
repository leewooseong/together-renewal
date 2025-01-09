import isValidTokenPayloadUtil from './validTokenPayloadUtil';

export default function getUserIdFromToken() {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('토큰이 없습니다.');
  }

  // JWT의 구조는 "header.payload.signature" 형태로 되어있으므로 "."을 기준으로 나눈다.
  const splitToken = token.split('.');
  if (splitToken.length !== 3) {
    throw new Error('유효하지 않은 토큰 형식입니다.');
  }

  try {
    const payload = JSON.parse(atob(splitToken[1]));

    if (!payload || !payload.userId) {
      throw new Error('유효하지 않은 토큰입니다.');
    }

    if (!isValidTokenPayloadUtil(payload)) {
      throw new Error('유효하지 않은 토큰입니다.');
    }

    return payload.userId;
  } catch (error) {
    throw new Error('토큰 디코딩 중 문제가 발생했습니다.');
  }
}
