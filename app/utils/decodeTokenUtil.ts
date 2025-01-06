/** JWT 디코딩 */
function decodeToken(token: string): any {
  const [header, payload, signature] = token.split('.');

  if (!payload) {
    throw new Error('유효하지 않은 형식입니다.');
  }

  try {
    return JSON.parse(atob(payload));
  } catch {
    throw new Error('디코딩 실패');
  }
}
