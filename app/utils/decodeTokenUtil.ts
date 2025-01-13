type TokenPayload = {
  userId: number;
  teamId?: string;
  iat?: number;
  exp?: number;
};

function decodeBase64(base64: string): string {
  if (typeof window !== 'undefined' && typeof atob === 'function') {
    return atob(base64);
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

export default function getUserIdFromToken(): number {
  const rawToken = sessionStorage.getItem('auth-token');
  const token = rawToken ? rawToken.replace(/"/g, '') : null;

  if (!token) {
    throw new Error('디코딩 할 토큰이 없습니다.');
  }

  const splitToken = token.split('.');
  if (splitToken.length !== 3) {
    throw new Error('유효하지 않은 토큰 형식입니다.');
  }

  try {
    const payload: TokenPayload = JSON.parse(decodeBase64(splitToken[1]));

    if (!payload || typeof payload.userId !== 'number') {
      throw new Error('유효하지 않은 토큰입니다. userId가 존재하지 않습니다.');
    }

    return payload.userId;
  } catch (error) {
    throw new Error(
      `토큰 디코딩 중 문제가 발생했습니다: ${error instanceof Error ? error.message : error}`,
    );
  }
}
