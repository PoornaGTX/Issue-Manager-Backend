import User from '../models/User';
import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../errors/index';
import { OK } from '../utils/statuscodes';

const getUsersByCompany = async (req: Request, res: Response) => {
  const { company } = req.query;

  console.log('company', company);

  if (!company) {
    throw new BadRequestError('please provide all values');
  }

  const users = await User.find({ company });

  if (!users) {
    throw new NotFoundError(`No users found for this company ${company}`);
  }

  res.status(OK).json({ users });
};

export { getUsersByCompany };
