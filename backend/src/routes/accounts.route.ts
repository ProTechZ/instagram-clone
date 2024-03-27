import express, { NextFunction, Request, Response } from 'express';
import { signUp, logIn, logOut } from '../controllers/accounts.controller.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const { jwt: token } = req.cookies;

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).send({
        loggedIn: false,
        err: 'not even logged in',
      });
    }

    next();
  });
};

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);
router.post('/logout', logOut);

export default router;
