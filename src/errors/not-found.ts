import CustomAPIError from './custom-api';

class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message, 404); //Not Found 404
  }
}

export default NotFoundError;
