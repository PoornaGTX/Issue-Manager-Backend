import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index';
import { Request, Response, NextFunction } from 'express';

const auth = async (req: Request | any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret or lifetime not defined in environment variables.');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth;
