import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../utils/statuscodes';

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);

  const defaultError = {
    StatusCode: err.StatusCode || INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  };

  if (err.name === 'ValidationError') {
    defaultError.StatusCode = BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(',');
  }

  //check eamil that already exsists
  if (err.code && err.code === 11000) {
    defaultError.StatusCode = BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  res.status(defaultError.StatusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
