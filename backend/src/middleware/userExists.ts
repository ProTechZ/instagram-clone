import { NextFunction, Request, Response } from 'express';
import pool from '../configs/postgres.config.js';

const userExists = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  pool.query(
    'SELECT * FROM users WHERE user_id = $1',
    [userId],
    (err, results) => {
      if (err) {
        return res.status(400).send(err);
      } else if (results.rows.length <= 0) {
        return res.status(400).send('no user exists here');
      }

      const user = results.rows[0];
      res.locals.user = user;
      next();
    }
  );
};

export default userExists;
