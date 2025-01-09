import {ErrorCodes, ErrorKey, ErrorMessages} from '../../../constants/errors';

export default class CustomServerError extends Error {
  public statusCode: number;

  public location?: string;

  constructor({
    errorKey = 'INTERNAL_SERVER_ERROR', // 기본값: 500
    location,
  }: {
    errorKey?: ErrorKey; // ErrorKey 타입
    location?: string;
  }) {
    super(ErrorMessages[errorKey]); // 메시지 설정
    this.statusCode = ErrorCodes[errorKey]; // 상태 코드 설정
    this.location = location;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomServerError);
    }
  }

  serializeErrors(): {
    message: string;
    statusCode: number;
    location?: string;
  } {
    return {
      message: this.message,
      statusCode: this.statusCode,
      location: this.location,
    };
  }
}
