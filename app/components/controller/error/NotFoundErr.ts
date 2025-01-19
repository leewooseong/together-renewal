import CustomServerError from './customServerError';

/** 404: Not Found */
export default class NotFoundErr extends CustomServerError {
  constructor(message: string = 'Not Found') {
    super({
      errorKey: 'NOT_FOUND',
    });
    this.message = message;
  }
}
