import jwtDecode from 'jwt-decode'; // jwt-decode 패키지 사용

export function getUserIdFromToken() {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('토큰이 없습니다.');
  }

  const decoded: any = jwtDecode(token);
  if (!decoded || !decoded.userId) {
    throw new Error('유효하지 않은 토큰입니다.');
  }

  return decoded.userId;
}
