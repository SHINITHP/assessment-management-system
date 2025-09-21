import { Router } from 'express';
import { reportGenerator } from './report.controller';
const router = Router();

router.post('/generate-report', reportGenerator);

export default router;