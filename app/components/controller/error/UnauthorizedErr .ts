import CustomServerError from './customServerError';

/** 401: Unauthorized - 인증 오류 */
export default class UnauthorizedErr extends CustomServerError {
  constructor(message: string = 'Unauthorized') {
    super({
      errorKey: 'UNAUTHORIZED',
    });
    this.message = message;
  }
}
