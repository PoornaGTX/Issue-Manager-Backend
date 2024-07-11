import { UnAuthenticatedError } from '../errors/index';

interface RequestUser {
  userId: string;
}

const checkPermissions = (requestUser: RequestUser, resourceUserId: string | number): void => {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAuthenticatedError('Not authorized to access this route');
};

export default checkPermissions;
