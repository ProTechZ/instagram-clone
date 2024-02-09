import express from'express';
import { logIn, signUp } from '../controllers/userController.js';
import saveUser from '../middleware/userAuth.js';

const router = express.Router();

router.post('/signup', saveUser, signUp);
router.post('/login', logIn);

export default router;