import CustomAPIError from './custom-api';

class UnAuthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message, 401); //UnAuthenticated 401
  }
}

export default UnAuthenticatedError;
