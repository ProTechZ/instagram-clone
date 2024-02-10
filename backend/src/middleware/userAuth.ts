import { NextFunction, Request, Response } from 'express';
import db from '../models/index.js';

const User = db.userModel;

const saveUser =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (username) {
      return res.status(409).json({ msg: 'username already in use' });
    }

    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailCheck) {
      return res.status(409).json({msg: 'email already in use'});
    }

    next();
  } catch (err) {
    console.log(err)
    return res.status(400).json({ from: "userAuth",err: err, });
  }
};

export default saveUser;
