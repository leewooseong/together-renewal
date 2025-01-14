import axios from 'axios';

export default async function fetchWithToken(
  req: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: Record<string, unknown>,
) {
  const rawToken = sessionStorage.getItem('auth-token');
  const token = rawToken ? rawToken.replace(/"/g, '') : null;

  if (!token) {
    window.location.href = '/login';
    throw new Error('인증 토큰이 없습니다.');
  }

  try {
    const config: Record<string, unknown> = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    if ((method === 'POST' || method === 'PUT') && data) {
      config.data = data;
    }

    const response = await axios(req, config);

    console.log(response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API 요청 실패: ${error.response?.statusText || error.message}`);
    } else {
      throw new Error(`알 수 없는 오류 발생: ${error}`);
    }
  }
}
