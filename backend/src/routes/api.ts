import { Router } from 'express';
import { getSurprise, createReply, getReplies } from '../controllers/surpriseController.js';

const router = Router();

router.get('/surprise/:code', getSurprise);
router.post('/replies', createReply);
router.get('/replies/:code', getReplies);

export default router;
