import { Router } from 'express';
import { reportGenerator, getAssessments } from './report.controller';
import { authMiddleware } from '../../middleware/auth';
const router = Router();

router.get('/', authMiddleware, getAssessments);
router.post('/generate-report/:session_Id', reportGenerator);

export default router;