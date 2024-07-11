import express from 'express';
const router = express.Router();

import { getUsersByCompany } from '../controller/usersController';

router.route('/').get(getUsersByCompany);
export default router;
