import express from 'express';
import { signUp, logIn, logOut } from '../controllers/accounts.controller.js';
import isLoggedIn from '../middleware/isLoggedIn.js';
const router = express.Router();
router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', isLoggedIn, logOut);
export default router;
