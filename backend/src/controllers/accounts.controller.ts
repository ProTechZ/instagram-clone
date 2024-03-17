import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import pool from '../configs/postgres.config.js';
import bcrypt from 'bcrypt';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, username, email, birthday, password } =
      req.body;

    const avatar = req.body.avatar
      ? req.body.avatar
      : 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-media-1677509740';

    const data = [
      first_name,
      last_name,
      username,
      email,
      avatar,
      birthday,
      await bcrypt.hash(password, 10),
    ];

    pool.query(
      'INSERT INTO users(first_name, last_name, username, email, avatar, birthday, password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * ',
      data,
      (err, results) => {
        if (err) {
          return res.status(400).send(err);
        }

        const user = results.rows[0];

        let token = jwt.sign(user, process.env.SECRET_KEY!, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie('jwt', token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });

        return res.status(201).send({
          logged_in: true,
          msg: `User added with ID: ${user.user_id}`,
          user,
        });
      }
    );
  } catch (err) {
    return res.status(400).send({ from: 'createUser', err });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { usernameEmail, password } = req.body;

    // be able to log in with username or email
    let query = 'username';
    if ((usernameEmail as string).includes('@')) {
      query = 'email';
    }

    pool.query(
      `SELECT * FROM users WHERE ${query} = $1`,
      [usernameEmail],
      async (err, results) => {
        if (err) {
          return res.status(400).send(err);
        } else if (results.rows.length <= 0) {
          return res.status(400).send('no user with that username or email');
        }

        const user = results.rows[0];
        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
          return res.status(401).send('password is incorrect');
        }

        let token = jwt.sign(user, process.env.SECRET_KEY!, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie('jwt', token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).send({ logged_in: true, user });
      }
    );
  } catch (err) {
    return res.status(400).send({ from: 'login', err });
  }
};

export const logOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt');

    return res.status(200).send({ logged_out: true });
  } catch (err) {
    return res.status(400).send({ from: 'logout', err });
  }
};
