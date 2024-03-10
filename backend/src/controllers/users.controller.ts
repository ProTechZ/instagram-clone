import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import pool from '../configs/postgres.config.js';

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    pool.query(
      'SELECT * FROM posts WHERE user_id = $1',
      [userId],
      (err, results) => {
        if (err) {
          return res.status(400).send({ err });
        }

        const posts = results.rows[0] ? results.rows[0] : [];
        const user = res.locals.user;

        const { jwt: jwtToken } = req.cookies;

        jwt.verify(
          jwtToken,
          process.env.SECRET_KEY!,
          (err: any, decoded: any) => {
            if (err) {
              return res.status(403).send({ is_user: false, user, posts });
            } else {
              return res.status(200).send({ is_user: true, posts, ...decoded });
            }
          }
        );
      }
    );
  } catch (err) {
    return res.status(400).send({ from: 'getUser', err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const fieldToUpdate = Object.keys(req.body)[0];
    const updatedValue = Object.values(req.body)[0];

    if (
      fieldToUpdate != 'first_name' &&
      fieldToUpdate != 'last_name' &&
      fieldToUpdate != 'username' &&
      fieldToUpdate != 'email' &&
      fieldToUpdate != 'avatar' &&
      fieldToUpdate != 'birthday'
    ) {
      return res
        .status(400)
        .send({ updated: false, err: 'invalid field to update' });
    } else if (!updatedValue) {
      return res.status(400).send({ updated: false, err: 'no update value' });
    }

    pool.query(
      `UPDATE users SET ${fieldToUpdate} = '${updatedValue}' WHERE user_id = ${userId}`,
      (err, results) => {
        if (err) {
          return res.status(400).send({ updated: false, err });
        }

        return res
          .status(200)
          .send({ updated: true, updatedUser: results.rows[0] });
      }
    );
  } catch (err) {
    return res.status(400).send({ from: 'updateUser', err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    pool.query(
      `DELETE FROM users WHERE user_id = ${userId}`,
      (err, results) => {
        if (err) {
          return res.status(400).send({ deleted: false, err });
        }

        return res
          .status(200)
          .send({ deleted: true, deletedUser: results.rows[0] });
      }
    );
  } catch (err) {
    return res.status(400).send({ from: 'deleteUser', err });
  }
};
