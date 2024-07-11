import express from 'express';
const router = express.Router();
import { createIssue, getAllIssues, getIssue, updateIssue, deleteIssue, issuePriorityStats } from '../controller/issueController';

router.route('/').post(createIssue).get(getAllIssues);
router.route('/stats').get(issuePriorityStats);
router.route('/:id').get(getIssue).patch(updateIssue).delete(deleteIssue);

export default router;
