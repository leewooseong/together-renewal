import CustomServerError from './customServerError';

/** 500: Internal Server Error(Unexpected Error) */
export default class InternalServerErr extends CustomServerError {
  constructor(message: string = 'Internal Server Error') {
    super({
      errorKey: 'INTERNAL_SERVER_ERROR',
    });
    this.message = message;
  }
}
