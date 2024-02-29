import { NextFunction, Request, Response } from 'express';
import pool from '../configs/postgres.config.js';

const postExists = (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;

  pool.query(
    'SELECT * FROM posts WHERE post_id = $1',
    [postId],
    (err, results) => {
      if (err) {
        return res.status(400).send(err);
      } else if (results.rows.length <= 0) {
        return res.status(400).send('no post exists here');
      }

      const post = results.rows[0];
      res.locals.post = post;
      next();
    }
  );
};

export default postExists;
