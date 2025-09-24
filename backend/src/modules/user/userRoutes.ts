import { Router } from 'express';
import { refreshToken, signIn, signUp, verifySignUpOTP } from './userController';
const router = Router();

router.post('/sign-up', signUp);
router.post('/verify-otp', verifySignUpOTP);
router.post('/refresh-token', refreshToken);
router.post('/sign-in', signIn);

export default router;