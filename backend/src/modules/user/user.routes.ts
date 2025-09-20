import { Router } from 'express';
import { signIn, signUp, verifySignUpOTP } from './user.controller';
const router = Router();

router.post('/sign-up', signUp);
router.post('/verify-otp', verifySignUpOTP);
router.post('/sign-in', signIn);

export default router;