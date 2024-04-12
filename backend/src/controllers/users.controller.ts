import { Request, Response } from 'express';
import pool from '../configs/postgres.config.js';
import { UserType } from '../app.js';

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userQueryResults = await pool.query(
      `SELECT * FROM users WHERE user_id = ${userId}`
    );

    if (userQueryResults.rows.length <= 0) {
      return res.send({ successful: false, err: 'User doesnt exist' });
    }

    const user = userQueryResults.rows[0];

    const postQueryResults = await pool.query(
      `SELECT * FROM posts WHERE user_id = ${userId}`
    );

    const posts = postQueryResults.rows;

    return res.status(200).send({ successful: true, posts, user });
  } catch (err) {
    return res.status(400).send({ from: 'getUser', successful: false, err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const toUpdate: any = {};

    for (const key in req.body) {
      if (!!key) {
        toUpdate[key] = req.body[key];
      }
    }

    for (const fieldToUpdate in toUpdate) {
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
          .send({ successful: false, err: 'invalid field to update' });
      } else {
        await pool.query(
          `UPDATE users SET ${fieldToUpdate} = '${toUpdate[fieldToUpdate]}' WHERE user_id = ${userId}`
        );
      }
    }

    return res.status(200).send({ successful: true });
  } catch (err) {
    return res.status(400).send({ from: 'updateUser', successful: false, err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const results = await pool.query(
      `DELETE FROM users WHERE user_id = ${userId}`
    );

    return res
      .status(200)
      .send({ successful: true, deletedUser: results.rows[0] });
  } catch (err) {
    return res.status(400).send({ from: 'deleteUser', successful: false, err });
  }
};
