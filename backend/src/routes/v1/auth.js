import express from 'express';
import { validateLogin, validateSignup } from '../../middlewares/validate.js';
import { loginUser, signupUser } from '../../controllers/authController.js';

const router = express.Router();

router.post('/signup', validateSignup, signupUser);
router.post('/login', validateLogin, loginUser);

export default router;
