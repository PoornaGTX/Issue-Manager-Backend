class CustomAPIError extends Error {
  StatusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.StatusCode = statusCode;
  }
}

export default CustomAPIError;
