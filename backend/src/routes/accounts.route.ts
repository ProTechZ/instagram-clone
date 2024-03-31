import express, { NextFunction, Request, Response } from 'express';
import { signUp, logIn, logOut } from '../controllers/accounts.controller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/logout', logOut);

export default router;
