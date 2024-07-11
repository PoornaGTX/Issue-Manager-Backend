import express from 'express';
const router = express.Router();

import { register, login } from '../controller/authController';
import authenticateUser from '../middleware/auth';

router.route('/register').post(register);
router.route('/login').post(login);

export default router;
