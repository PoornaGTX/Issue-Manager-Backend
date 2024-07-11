import express from 'express';
const router = express.Router();

import { register, login } from '../controller/authController';

router.route('/register').post(register);
router.route('/login').post(login);

export default router;
