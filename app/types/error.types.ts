// login Error
type CodeitErrorMessage =
  | '비밀번호가 아이디와 일치하지 않습니다.'
  | '존재하지 않는 아이디입니다.'
  | '서버 오류가 발생했습니다.'
  | '잘못된 인증 정보 입니다.';
type CodeitErrorCode = 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'SERVER_ERROR' | 'INVALID_TOKEN';
export type CodeitErrorStatus = 401 | 404 | 500;
type CodeitErrorParameter = string | null;

export class CodeitError extends Error {
  constructor(
    public message: CodeitErrorMessage,
    public status: CodeitErrorStatus,
    public code?: CodeitErrorCode,
    public parameter?: CodeitErrorParameter,
  ) {
    super();
  }
}
