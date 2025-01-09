import CustomServerError from './customServerError';

/** Bad Request - 요청 오류 */
export default class BadReqErr extends CustomServerError {
  constructor(message: string = 'Bad Request') {
    super({
      errorKey: 'BAD_REQUEST',
      location: undefined,
    });
    this.message = message;
  }
}
