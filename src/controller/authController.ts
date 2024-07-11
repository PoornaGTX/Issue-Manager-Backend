import User from '../models/User';
import { Request, Response } from 'express';
import { BadRequestError, UnAuthenticatedError } from '../errors/index';
import { CREATED, OK } from '../utils/statuscodes';

const register = async (req: Request, res: Response) => {
  const { name, email, company, position, password } = req.body;

  if (!name || !email || !company || !position || !password) {
    throw new BadRequestError('please provide all values');
  }

  const userAlreadyExsisits = await User.findOne({ email });

  if (userAlreadyExsisits) {
    throw new BadRequestError('Email already in use');
  }

  const user = await User.create({
    name,
    email,
    company,
    position,
    password,
  });

  const token = user.createJWT();

  res.status(CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      company: user.company,
      position: user.position,
    },
    token,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new UnAuthenticatedError('invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('invalid Credentials');
  }

  const token = user.createJWT();
  user.password = undefined;

  res.status(OK).json({ user, token });
};

export { register, login };
