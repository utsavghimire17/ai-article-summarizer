import express from 'express'
import { signupUser, loginUser } from '../controllers/user-controller.js';
import  {saveHistory,getHistory}  from '../controllers/history-controller.js';

const router = express.Router();

router.post('/signup',signupUser);
router.post('/login', loginUser);
router.post('/saveHistory',saveHistory)
router.get('/getHistory',getHistory)



export default router