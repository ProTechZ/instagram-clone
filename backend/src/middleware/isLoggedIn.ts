import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const isLoggedIn = (notLoggedInMsg?: Object) => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    const { jwt: jwtToken } = req.cookies;

    jwt.verify(jwtToken, process.env.SECRET_KEY!, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).send({
          logged_in: false,
          ...notLoggedInMsg,
        });
      } 

        next();
      
    });
  };
};

export default isLoggedIn;
