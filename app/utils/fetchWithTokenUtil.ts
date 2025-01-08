export async function fetchWithToken(req: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');

  if (!token) {
    window.location.href = '/login';
    throw new Error('인증 토큰이 없습니다.');
  }

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');

  const resp = await fetch(req, {
    ...options,
    headers,
  });

  if (!resp.ok) {
    throw new Error(`API 요청 실패: ${resp.statusText}`);
  }

  try {
    const contentType = resp.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return resp.json();
    }
    throw new Error('JSON 형식이 아닌 응답입니다.');
  } catch (err: any) {
    throw new Error(`응답 처리 실패: ${err.message}`);
  }
}
