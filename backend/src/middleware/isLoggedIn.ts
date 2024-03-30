import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const { jwt: token } = req.cookies;

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    console.log(token);
    if (err) {
      return res.status(403).send({
        loggedIn: false,
        err: 'not logged in',
      });
    }
    next();
  });
};

export default isLoggedIn;
