import Issue from '../models/Issue';
import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../errors/index';
import { CREATED, OK } from '../utils/statuscodes';
import { MyRequest } from './types';
import checkPermissions from '../utils/checkPermission';

const createIssue = async (req: MyRequest, res: Response) => {
  const { title, description, status, priority, startDate, dueDate, assignee } = req.body;

  if (!title || !description || !status || !priority || !startDate || !dueDate) {
    throw new BadRequestError('please provide all values');
  }

  if (req.user) {
    req.body.createdBy = req.user.userId;
  }

  const issue = await Issue.create(req.body);

  res.status(CREATED).json({ issue });
};

const getAllIssues = async (req: MyRequest, res: Response) => {
  const { search, type, filter } = req.query;

  console.log('type', type);

  let userId;
  if (req.user) {
    userId = req.user.userId;
  }

  const queryObject: any = {};

  if (type !== 'Personal') {
    queryObject.assignee = userId;
  } else {
    queryObject.createdBy = userId;
  }

  if (search) {
    queryObject.title = { $regex: search, $options: 'i' };
  }

  if (filter !== 'all') {
    queryObject.priority = filter;
  }

  const issues = await Issue.find(queryObject);
  res.status(OK).json({ issues });
};

const getIssue = async (req: MyRequest, res: Response) => {
  const { id } = req.params;
  const issue = await Issue.findOne({ _id: id });

  if (!issue) {
    throw new NotFoundError('please provide all values');
  }

  res.status(OK).json({ issue });
};

const updateIssue = async (req: MyRequest, res: Response) => {
  const { id: issueId } = req.params;
  const { title, description, status, priority, startDate, dueDate } = req.body;

  let userId;
  if (req.user) {
    userId = req.user;
  }

  if (!title || !description || !status || !priority || !startDate || !dueDate) {
    throw new BadRequestError('Please provide all values');
  }

  const issue = await Issue.findOne({ _id: issueId });

  if (!issue) {
    throw new NotFoundError(`No issue with id:${issueId}`);
  }

  if (userId) {
    checkPermissions(userId, issue.createdBy);
  }

  const updatedIssue = await Issue.findOneAndUpdate({ _id: issueId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(OK).json({ updatedIssue });
};

const deleteIssue = async (req: MyRequest, res: Response) => {
  const { id: issueId } = req.params;

  let userId;
  if (req.user) {
    userId = req.user;
  }

  const issue = await Issue.findOne({ _id: issueId });

  if (!issue) {
    throw new NotFoundError(`No issue with id:${issueId}`);
  }

  if (userId) {
    checkPermissions(userId, issue.createdBy);
  }

  await Issue.findOneAndDelete({ _id: issueId });

  res.status(OK).json({ msg: 'Success! issue removed' });
};

const issuePriorityStats = async (req: MyRequest, res: Response) => {
  const priorities = await Issue.aggregate([
    {
      $group: {
        _id: '$priority',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        priority: '$_id',
        count: 1,
      },
    },
  ]);

  const statuses = await Issue.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
      },
    },
  ]);

  res.status(200).json({ priorities, statuses });
};

export { createIssue, getAllIssues, getIssue, updateIssue, deleteIssue, issuePriorityStats };
