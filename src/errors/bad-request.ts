import CustomAPIError from './custom-api';

class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message, 400); //BAD request 400
  }
}

export default BadRequestError;
