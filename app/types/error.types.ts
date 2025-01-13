// login Error
type AuthErrorMessage =
  | '비밀번호가 아이디와 일치하지 않습니다.'
  | '존재하지 않는 아이디입니다.'
  | '서버 오류가 발생했습니다.'
  | '잘못된 인증 정보 입니다.';
type AuthErrorCode = 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'SERVER_ERROR' | 'INVALID_TOKEN';
type AuthErrorStatus = 401 | 404 | 500;

export class AuthError extends Error {
  constructor(
    public message: AuthErrorMessage,
    public code: AuthErrorCode,
    public status: AuthErrorStatus,
  ) {
    super();
  }
}
