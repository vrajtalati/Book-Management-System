import express from 'express';
import { registerUser, registerSeller, loginUser, loginSeller } from '../controllers/authController';

const router = express.Router();

router.post('/register/user', registerUser);
router.post('/register/seller', registerSeller);
router.post('/login/user', loginUser);
router.post('/login/seller', loginSeller);

export default router;
