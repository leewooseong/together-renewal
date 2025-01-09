import CustomServerError from './customServerError';

/** 405: Method Not Allowed */
export default class MethodNotAllowedErr extends CustomServerError {
  constructor(message: string = 'Method Not Allowed') {
    super({
      errorKey: 'METHOD_NOT_ALLOWED',
    });
    this.message = message;
  }
}
