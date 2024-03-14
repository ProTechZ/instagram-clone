import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type User = {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  birthday: Date;
  password: string;
};

const isAllowed = (deniedMsg?: Object) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.jwt) {
      return res.status(403).send({
        err: 'not logged in',
      });
    }

    const { jwt: token } = req.cookies;
    let currUserId = null;

    if (res.locals.user) {
      currUserId = res.locals.user.user_id;
    } else if (res.locals.post) {
      currUserId = res.locals.post.user_id;
    } else if (res.locals.comment) {
      currUserId = res.locals.comment.user_id;
    }
    const loggedInUserId = (jwt.decode(token) as User).user_id;

    if (loggedInUserId != currUserId) {
      return res.status(403).send({ err: 'not the correct user' });
    }

    jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).send({
          ...deniedMsg,
        });
      }

      next();
    });
  };
};

export default isAllowed;
