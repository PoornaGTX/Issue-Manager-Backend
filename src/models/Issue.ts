import mongoose from 'mongoose';
import { issueType } from './types';

const IssueSchema = new mongoose.Schema<issueType>(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Testing'],
      required: [true, 'Please provide status'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: [true, 'Please provide priority level'],
    },
    startDate: {
      type: String,
      required: [true, 'Please provide start date'],
    },
    dueDate: {
      type: String,
      required: [true, 'Please provide due date'],
    },
    assignee: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Issue', IssueSchema);
