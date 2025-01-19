import CustomServerError from './customServerError';

/** 403: Forbidden - 권한부족 */
export default class ForbiddenErr extends CustomServerError {
  constructor(message: string = 'Forbidden') {
    super({
      errorKey: 'FORBIDDEN',
    });
    this.message = message;
  }
}
