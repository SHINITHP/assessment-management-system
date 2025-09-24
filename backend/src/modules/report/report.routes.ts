import { Router } from 'express';
import { reportGenerator, getAssessments } from './report.controller';
const router = Router();

router.get('/', getAssessments);
router.post('/generate-report/:session_Id', reportGenerator);

export default router;