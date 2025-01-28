export const ErrorMessages = {
  BAD_REQUEST: 'The request is invalid.',
  UNAUTHORIZED: 'Authentication is required.',
  FORBIDDEN: 'You do not have access to this resource.',
  NOT_FOUND: 'The requested resource could not be found.',
  METHOD_NOT_ALLOWED: 'This method is not allowed.',
  INTERNAL_SERVER_ERROR: 'An unexpected error occurred.',
} as const;

export const ErrorCodes = {
  BAD_REQUEST: 400, // 요청 err
  UNAUTHORIZED: 401, // 인증 err
  FORBIDDEN: 403, // 권한 err
  NOT_FOUND: 404, // 해당 리소스 없음
  METHOD_NOT_ALLOWED: 405, // method형식 err
  INTERNAL_SERVER_ERROR: 500, // 그외 알 수 없는 err
} as const;

export type ErrorKey = keyof typeof ErrorCodes;
